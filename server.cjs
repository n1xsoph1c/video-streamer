const express = require("express")
const app = express()
var cors = require('cors')
const path = require('path')
const nameToImdb = require("name-to-imdb")


// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle requests for the root route
app.get("/movie", function (req, res) {
    res.sendFile(__dirname + path.join("dist", "index.html"))
})

app.get("/movie/api/:id", (req, res) => {
    let id = req.params.id
 
    nameToImdb(id,  (err, resp, inf) => {
        res.send(JSON.stringify(inf.meta))
    })
})


app.listen(8000)