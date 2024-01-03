export function matchWords(w1: string, w2: string) {
    var wordMatch = true
    var searchWords = w2.split(" ")
    for (var i in searchWords) {
        if (w1.toLowerCase().includes(searchWords[i].toLowerCase())) wordMatch = true
        else {
            return false
        }
    }
    return wordMatch
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