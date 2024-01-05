
import { options } from '@/app/api/auth/[...nextauth]/options'
import { pool } from '@/utils/db'
import { Session, getServerSession } from 'next-auth'
import React, { Fragment } from 'react'
import ExerciseChart from '../Review/ExerciseChart'
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
        const sql = `SELECT exercises_weight.id, sets, reps, weight, rpe, name FROM record_weight JOIN exercises_weight ON exercises_weight.id=record_weight."exerciseId" WHERE "userId"=$1 ORDER BY date_recorded DESC LIMIT 3`
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
        <Fragment >


            <div className='items-center p-4 bg-[#1B1F38] rounded-xl shadow-xl gap-4  text-center flex justify-center max-w-screen overflow-hidden'>

                {
                    records.error ? <div>
                        <p>There was An Error Fetching the Data</p>
                    </div> :
                        records.data.length === 0 ?
                            <div>
                                <h1 className=''>Record Something to display it!</h1>
                            </div>
                            :
                            <div className='flex flex-col gap-4 items-center w-full'>


                                <h1 className='bg-[#F87D12] rounded-full text-white px-4 py-3 shadow-xl text-center'> Recently Recorded</h1>
                                <div className='w-full'>
                                    <table className='text-white table-auto border-collapse border-spacing-2 w-full border'>
                                        <thead>
                                            <tr>
                                                <th className='px-1 md:p-3 border-r border-slate-400'>Name</th>
                                                <th className='px-1 md:p-3 border-r border-slate-400'>Sets</th>
                                                <th className='px-1 md:p-3 border-r border-slate-400'>Reps</th>
                                                <th className='px-1 md:p-3 border-r border-slate-400'>Weight</th>
                                                <th className='px-1 md:p-3 border-l border-slate-400'>RPE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                records.data.map((record, index) => (
                                                    <tr key={index}>
                                                        <td className='p-1 border-r border-t border-slate-400 '>{record.name}</td>
                                                        <td className='p-1  border-t border-r border-slate-400' >{record.sets}</td>
                                                        <td className='p-1  border-t border-r border-slate-400'>{record.reps}</td>
                                                        <td className='p-1  border-t border-r border-slate-400'>{record.weight} kg</td>
                                                        <td className='p-1  border-t border-slate-400'>{record.rpe}</td>
                                                    </tr>

                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                }


            </div>

        </Fragment>
    )
}

export default RecentlyRecorded