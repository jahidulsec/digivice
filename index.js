const express = require("express");
const path = require("path");
const port = 6053;


const app = express()

app.use(express.static(path.join(__dirname, 'client', 'public')))

app.listen(port, () => {
    console.log("Server listening on PORT", port)
})