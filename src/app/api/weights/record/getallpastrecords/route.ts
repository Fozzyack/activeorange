import { options } from "@/app/api/auth/[...nextauth]/options";
import { ExtendedServerSession } from "@/types/types";
import { pool } from "@/utils/db";
import { getServerSession } from "next-auth";



export async function GET(req: Request) {

    try {
        const session = await getServerSession(options) as ExtendedServerSession
        const sql = `
        SELECT name, weight, sets, reps, rpe, log, date_recorded FROM record_weight rw JOIN exercises_weight ew
        ON rw."exerciseId"=ew.id WHERE rw."userId"=$1
        ORDER BY date_recorded ASC
        `
        const data = await pool.query(sql, [session.user?.id])
        return Response.json(data.rows)
    } catch (error: any) {
        console.log(error.message)
        return Response.json({ error: error.message }, { status: 500 })
    }



}