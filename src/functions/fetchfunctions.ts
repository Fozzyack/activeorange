export const getAllRecords = async () => {
    const res = await fetch('/api/weights/record/getallpastrecords', {
        method: 'GET'
    })
    if(!res.ok) throw new Error('There was an Error getting all records')
    return await res.json()
}

export const getLiftData = async (id: number) => {
    const res = await fetch(`/api/weights/exercises/chart/${id}`, {
        method: 'GET'
    })
    if (!res.ok) {
        throw new Error('There was an Error fetching exercise Data')
    }

    const data = await res.json()
    return data
}

export async function getSets(name: string) {

    const res = await fetch(`/api/weights/getMEV/${name}`, {
        method: 'GET'
    })
    if (!res.ok) {
        throw new Error('There was an Error Fetching MEV')
    }
    return await res.json()
}