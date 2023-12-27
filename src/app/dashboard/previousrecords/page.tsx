'force-dynamic'
import { options } from '@/app/api/auth/[...nextauth]/options'
import FindExercise from '@/components/previousrecords/FindExercise'
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
type record = {
    id: number
    name: string,
    date_recorded: Date,
    reps: number,
    sets: number,
    weight: string,
    rpe: number
}

interface records {
    error: null | boolean;
    data: record[];
} 
async function getRecords() {
    try {

        const session = await getServerSession(options) as ExtendedServerSession
        const sql = `SELECT sets, reps, weight, rpe, name, date_recorded, record_weight.id AS id FROM record_weight JOIN exercises_weight ON exercises_weight.id=record_weight."exerciseId" WHERE "userId"=$1 ORDER BY date_recorded DESC LIMIT 20`
        const response = await pool.query(sql, [session.user?.id])
        return {
            error: null,
            data: response.rows
        };

    } catch (error) {
        console.log(error)
        return {
            error: true,
            data: []
        }
    }
}

const page = async () => {
    let records = await getRecords() as records
  return (
    <div>
        <FindExercise records={records}/>
    </div>
  )
}

export default page