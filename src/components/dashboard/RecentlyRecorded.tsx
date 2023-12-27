
import { options } from '@/app/api/auth/[...nextauth]/options'
import { pool } from '@/utils/db'
import { Session, getServerSession } from 'next-auth'
import React from 'react'

interface ExtendedUserSession extends Session {
    user?: {
        id?: string | null | undefined,
        name?: string | null | undefined,
        image?: string | null | undefined,
        email?: string | null | undefined,
    } | undefined
}

async function getRecords() {
    try {

        const session = await getServerSession(options) as ExtendedUserSession
        const sql = `SELECT sets, reps, weight, rpe, name FROM record_weight JOIN exercises_weight ON exercises_weight.id=record_weight."exerciseId" WHERE "userId"=$1 ORDER BY date_recorded DESC LIMIT 20`
        const response = await pool.query(sql, [session.user?.id])
        return {
            error: null,
            data: response.rows
        };

    } catch (error) {
        console.log(error)
        const payload = {
            error: error,
            data: []
        }
        return payload
    }
}

const RecentlyRecorded = async () => {
    const records = await getRecords()
    return (
        <div className='flex flex-col items-center p-4 bg-[#DD8233] rounded-xl shadow-xl gap-4'>

            {
                records.error ? <div>
                    <p>There was An Error Fetching the Data</p>
                </div> :
                    records.data.length === 0 ?
                        <div>
                            <h1 className='text-3xl'>Record Something to display it!</h1>
                        </div>
                        :
                        <div className='flex flex-col gap-4'>


                            <h1 className='bg-[#1E2229] rounded-full text-white px-4 py-3 shadow-xl text-center'> Recently Recorded</h1>
                            <table className='text-white table-auto bg-slate-800 border-collapse border-spacing-2 w-full rounded-3xl'>
                                <thead>
                                    <tr>
                                        <th className='p-3 border-r border-slate-400'>Name</th>
                                        <th className='p-3 border-r border-slate-400'>Sets</th>
                                        <th className='p-3 border-r border-slate-400'>Reps</th>
                                        <th className='p-3 border-r border-slate-400'>Weight</th>
                                        <th className='p-3 border-l border-slate-400'>RPE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        records.data.map((record, index) => (
                                            <tr key={index}>
                                                <td className='p-1 border-r border-t border-slate-400 '>{record.name}</td>
                                                <td className='p-1  border border-slate-400' >{record.sets}</td>
                                                <td className='p-1  border border-slate-400'>{record.reps}</td>
                                                <td className='p-1  border border-slate-400'>{record.weight}</td>
                                                <td className='p-1  border-l border-t border-slate-400'>{record.rpe}</td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
            }

        </div>
    )
}

export default RecentlyRecorded