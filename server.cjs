const express = require("express")
const app = express()
var cors = require('cors')
const nameToImdb = require("name-to-imdb")

app.get("/movie", function (req, res) {
    res.sendFile(__dirname + "/dist/index.html")
})
app.use(cors({origin: "gamisticstudio.com"}));
app.get("/api/:id", (req, res) => {
    let id = req.params.id
 
    nameToImdb(id,  (err, resp, inf) => {
        res.send(JSON.stringify(inf.meta))
    })
})


app.listen()