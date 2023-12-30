import { options } from "@/app/api/auth/[...nextauth]/options"
import { ExtendedServerSession } from "@/types/types"
import { pool } from "@/utils/db"
import { getServerSession } from "next-auth"

export const dynamic = 'force-dynamic'
export async function POST(req: Request) {

    try {
        const session = await getServerSession(options) as ExtendedServerSession
        const formData = await req.formData()
        const sql = `UPDATE record_weight SET weight=$1, rpe=$2, sets=$3, reps=$4 WHERE "userId"=$5 AND id=$6 `
        await pool.query(sql, [formData.get('weights'), formData.get('rpe'), formData.get('sets'), formData.get('reps'), session.user?.id, formData.get('id')])
        return Response.json({ success: true })
    } catch (error) {
        return Response.json({success: false}, {status: 500})
    }


}