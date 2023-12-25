import { Session, getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { pool } from "@/utils/db";

interface ExtendedUserSession extends Session {
    user?: {
      id?: string | null | undefined,
      name?: string | null | undefined,
      image?: string | null | undefined,
      email?: string | null | undefined,
    } | undefined
  }
export async function GET(request: Request) {
    const session = await getServerSession(options) as ExtendedUserSession
    const sql = `SELECT sets, reps, weight, rpe, name FROM record_weight JOIN exercises_weight ON exercises_weight.id=record_weight."exerciseId" WHERE "userId"=$1 ORDER BY date_recorded DESC LIMIT 20`
    const data = await pool.query(sql, [session.user?.id])
    return Response.json(data.rows);
}