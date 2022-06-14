
const API_KEY = "b4d01fc4"

// async function getTodo(id){
//     const response = await fetch
// }

async function getMovies(title){
    const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${title}`)
    const result = await response.json()

    if (!result) return console.error("Error", result)
    return result
}