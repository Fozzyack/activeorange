import { options } from '@/app/api/auth/[...nextauth]/options'
import { pool } from '@/utils/db'
import { Session, getServerSession } from 'next-auth'
import React from 'react'

interface ExtendedServerSession extends Session {
    user?: {
        id?: string | null | undefined,
        name?: string | null | undefined,
        email?: string | null | undefined,
        image?: string | null | undefined,
    } | undefined,
}
async function getOneRepMaxs() {
    try {
        const session = await getServerSession(options) as ExtendedServerSession
        const sql = `SELECT name, date_recorded, weight FROM record_weight JOIN exercises_weight ON record_weight."exerciseId"=exercises_weight.id WHERE "userId"=$1 AND reps=$1 ORDER BY date_recorded DESC`
        const response = await pool.query(sql, [session.user?.id])
        const payload = {
            error: false,
            data: response.rows
        }
        return payload
    } catch (error) {
        console.log(error)
        const response = {
            error: true,
            data: []
        }
        return response
    }

}
const OneRepMax = async () => {
    const oneRMS = await getOneRepMaxs()
    return (
        <div className='flex'>
            {oneRMS.error ?
                <div>
                    <p>There was an Error fetching the data</p>
                </div> :
                <div className='flex flex-col items-center gap-4'>
                    <h1 className='text-3xl font-bold text-white text-center'> One Rep Max Attempts</h1>
                    <table className='text-white table-auto border border-collapse border-slate-600'>
                        <thead>
                            <tr>
                                <th className='border border-slate-600'>Name</th>
                                <th className='border border-slate-600'>Weight</th>
                                <th className='border border-slate-600'>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                oneRMS.data.map((repMax, index) => (
                                    <tr key={index}>
                                        <td className='border border-slate-700'>{repMax.name}</td>
                                        <td className='border border-slate-700'>{repMax.weight}</td>
                                        <td className='border border-slate-700'>{repMax.date_recorded.toDateString()}</td>
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

export default OneRepMax