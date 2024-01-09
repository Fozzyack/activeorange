import { options } from "@/app/api/auth/[...nextauth]/options"
import { ExtendedServerSession } from "@/types/types"
import { pool } from "@/utils/db"
import { getServerSession } from "next-auth"

function getDates() {
    const currentDate = new Date(Date.now());

    const currentDayOfWeek = currentDate.getDay();

    const daysUntilMonday = (currentDayOfWeek + 6) % 7;

    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - daysUntilMonday);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return { startDate, endDate }
}
export const dynamic = 'force-dynamic'

const SQL = `SELECT r.sets FROM record_weights r JOIN exercises_weights ew
        ON r."exerciseId"=ew.id JOIN muscle_exercises_weight mew
        ON mew."exerciseId"=ew.id JOIN muscle_group mg
        ON mew."muscleId"=mg.id
        WHERE r."userId"=$1 AND r.date_recorded >= $2 AND r.date_recorded <= $3 AND mg.name=$4`

export async function GET(req: Request, { params }: { params: { musclegroup: string } }) {
    try {
        const session = await getServerSession(options) as ExtendedServerSession
        const { startDate, endDate } = getDates()
        var sets = 0
        const sql = `SELECT r.sets FROM record_weight r JOIN exercises_weight ew
        ON r."exerciseId"=ew.id JOIN muscle_exercises_weight mew
        ON mew."exerciseId"=ew.id JOIN muscle_groups mg
        ON mew."muscleId"=mg.id
        WHERE r."userId"=$1 AND r.date_recorded > $2 AND r.date_recorded < $3 AND mg.name=$4`
        const data = await pool.query(sql, [session.user?.id, startDate, endDate, params.musclegroup])
       
        data.rows.forEach((element) => {
            sets += element.sets
        })
        console.log(params.musclegroup, " : ", sets)
        return Response.json(sets)
       
    } catch (error: any) {
        console.log(error.message)
        return Response.json({ error: error.message }, { status: 500 })
    }
}