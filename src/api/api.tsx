
const apiUrl = 'https://jsonplaceholder.typicode.com/users'

export const consultarApi = async () => {
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data
    }
    catch (error) {
        console.log(error instanceof Error) //error al hacer fetch, se devuelve el array vacío
        return []
    }
}

