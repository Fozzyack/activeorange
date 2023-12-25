import { options } from "@/app/api/auth/[...nextauth]/options"
import { pool } from "@/utils/db"
import { Session, getServerSession } from "next-auth"

interface ExtendedUserSession extends Session {
    user: {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
        id?: string | null | undefined;
    } | undefined
}

export async function GET(request: Request, { params }: { params: { exerciseId: number } }) {
    const session = await getServerSession(options) as ExtendedUserSession
    const sql = `SELECT weight, rpe, log, sets, reps, date_recorded FROM record_weight WHERE "userId"=$1 AND "exerciseId"=$2 ORDER BY date_recorded ASC`

    const data = await pool.query(sql, [session.user?.id, params.exerciseId])

    return Response.json(data.rows)
}