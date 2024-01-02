import { options } from "@/app/api/auth/[...nextauth]/options";
import { ExtendedServerSession } from "@/types/types";
import { pool } from "@/utils/db";
import { getServerSession } from "next-auth";

function removeDuplicates(data: any[]) {
    let namecheck = [] as string[]
    let unique = [] as any[]
    data.forEach(element => {
        if (!namecheck.includes(element.name)){
            namecheck.push(element.name)
            unique.push(element)
        }
    })
    return unique
}

export const dynamic = 'force-dynamic'
export async function GET(req: Request) {
    try {
        const session = await getServerSession(options) as ExtendedServerSession
        const sql = `SELECT "exerciseId", name FROM record_weight JOIN exercises_weight ON record_weight."exerciseId"=exercises_weight.id WHERE "userId"=$1`
        const data = await pool.query(sql, [session.user?.id])
        const payload = removeDuplicates(data.rows)
        return Response.json(payload);
    } catch (error: any) {
        console.error(error.message)
        return Response.json({ error: error.message }, { status: 500 })
    }

}