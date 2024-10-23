const express = require("express");
const path = require("path");
const port = 6053;


const app = express()
const cors = require('cors')


app.use(cors())

app.use(express.static(path.join(__dirname, 'client', 'public')))

app.get('/', (req, res) => {
    return res.send('Welcome to Digivice Asset')
})

app.listen(port, () => {
    console.log("Server listening on PORT", port)
})