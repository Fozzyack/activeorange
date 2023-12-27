import { options } from "@/app/api/auth/[...nextauth]/options"
import { pool } from "@/utils/db"
import { Session, getServerSession } from "next-auth"

interface ExendedUserSession extends Session {
    user?: {
        id?: string | null | undefined,
        email?: string | null | undefined,
        name?: string | null | undefined,
        image?: string | null | undefined,
    } | undefined
}
export const dynamic = "force-dynamic"
export async function POST(request: Request) {
    const session = await getServerSession(options) as ExendedUserSession
    const upload_sql = `INSERT INTO record_weight ("userId", "exerciseId", weight, sets, reps, date_recorded, rpe, log) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`

    try {
        const data = await request.json()
        const upload = await pool.query(upload_sql, [session.user?.id, data.id, data.weight, data.sets, data.reps, data.date, data.rpe, data.log])

        console.log(upload.rows[0]);
        return Response.json('Success')
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            error: error
        }), {
            status: 500
        })
    }

}