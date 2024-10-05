

async function getAllLinks() {
   const reponse = await fetch("http://localhost:4000/api/links", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await reponse.json()
    return result
}

async function createLink(params) {
    
}

async function editLink(params) {
    
}

async function deleteLink(params) {
    
}

export default {
    getAllLinks,
    createLink,
    editLink,
    deleteLink
}