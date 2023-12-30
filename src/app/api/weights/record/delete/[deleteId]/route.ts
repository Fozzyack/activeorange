import { options } from "@/app/api/auth/[...nextauth]/options";
import { ExtendedServerSession } from "@/types/types";
import { pool } from "@/utils/db";
import { getServerSession } from "next-auth";


export const dynamic = "force-dynamic"
export async function DELETE(request: Request, {params} : {params: {deleteId: string}}) {
    try {
        const session = await getServerSession(options) as ExtendedServerSession
        const sql = `DELETE FROM record_weight WHERE "userId"=$1 AND id=$2`
        await pool.query(sql, [session.user?.id, params.deleteId])
        return Response.json('Success')
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({msg: 'Error Updating Data'}), {status: 500})
    }
}