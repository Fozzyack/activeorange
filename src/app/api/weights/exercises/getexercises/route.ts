import { pool } from "@/utils/db"

export const revalidate = 3600
export async function GET(request: Request) {
    const sql = `SELECT exercises_weight.name AS e_name, muscle_groups.name AS m_name, exercises_weight.id FROM exercises_weight JOIN muscle_groups ON exercises_weight.muscle_group=muscle_groups.id ORDER BY exercises_weight.name ASC`
    const data = await pool.query(sql)
    return Response.json(data.rows)
}