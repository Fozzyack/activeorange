import { options } from "@/app/api/auth/[...nextauth]/options"
import { pool } from "@/utils/db"
import { getServerSession } from "next-auth"

export async function POST(request: Request) {
    const session = await getServerSession(options)
    const get_user_sql = `SELECT id FROM users WHERE email=$1 AND name=$2`
    const upload_sql = `INSERT INTO record_weight ("userId", "exerciseId", weight, sets, reps, date_recorded) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
    const data = await request.json()
    const user_id = (await pool.query(get_user_sql, [session?.user?.email, session?.user?.name])).rows[0].id
    const upload = await pool.query(upload_sql, [user_id, data.id, data.weight, data.sets, data.reps, data.date])

    console.log(upload);
    return Response.json('test')
}