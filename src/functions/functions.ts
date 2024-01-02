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