/*
const express = require('express')
const app = express()
const port = 4000

const links = [
    {
        id: 1,
        name: "Google",
        url: "http://google.com",
        visible: true,
        archived: false
    },
    {
        id: 2,
        name: "Facebook",
        url: "http://facebook.com",
        visible: true,
        archived: false
    },
]

app.use(express.json())

app.get('/links', (req, res) => {
    res.json(links)
})

app.post('/links', (req, res) => {
    const link = req.body

    links.push(link)
    res.json(link)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/