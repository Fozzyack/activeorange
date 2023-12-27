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
    } | undefined
}

interface records {
    error: null;
    data: any[];
} 
async function getRecords() {
    try {

        const session = await getServerSession(options) as ExtendedServerSession
        const sql = `SELECT sets, reps, weight, rpe, name FROM record_weight JOIN exercises_weight ON exercises_weight.id=record_weight."exerciseId" WHERE "userId"=$1 ORDER BY date_recorded DESC LIMIT 20`
        const response = await pool.query(sql, [session.user?.id])
        return {
            error: null,
            data: response.rows
        };

    } catch (error) {
        console.log(error)
        return {
            error: null,
            data: []
        }
    }
}

const page = async () => {
    const data = getRecords()
  return (
    <div>

    </div>
  )
}

export default page