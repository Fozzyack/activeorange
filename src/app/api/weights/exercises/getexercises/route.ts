import { pool } from "@/utils/db"

type dataList = {
    e_name: string,
    m_name: string,
    id: number
}[]

type returnObj = {
    e_name: string,
    m_name: string[],
    id: number
}[]

function dataSorter(dataList: dataList) {
    const exerciseList = [] as string[]
    const muscle_groups_list = [] as string[][]
    const ids = [] as number[]
    var returnObj = [] as returnObj
    dataList.forEach((element) => {
        if (!exerciseList.includes(element.e_name)) {
            exerciseList.push(element.e_name)
            ids.push(element.id)
            const muscle_groups = [] as string[]
            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].e_name === element.e_name) {
                    muscle_groups.push(dataList[i].m_name)
                }
            }
            muscle_groups_list.push(muscle_groups)
        }
    })
    console.log(exerciseList, muscle_groups_list, ids)
    for (var i = 0; i < exerciseList.length; i++) {
        returnObj = [...returnObj, { e_name: exerciseList[i], m_name: muscle_groups_list[i], id: ids[i] }]
    }
    return returnObj
}

export const revalidate = 60
export async function GET(request: Request) {
    const sql = `
    SELECT e.name AS e_name, m.name AS m_name, e.id FROM exercises_weight e JOIN muscle_exercises_weight me
    ON e.id=me."exerciseId" JOIN muscle_groups m
    ON me."muscleId"=m.id
    ORDER BY e.name ASC
    `
    const data = await pool.query(sql)
    const payload = dataSorter(data.rows)

    console.log(payload)
    return Response.json(payload)
}