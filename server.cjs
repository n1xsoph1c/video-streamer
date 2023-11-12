const express = require("express")
const app = express()
var cors = require('cors')
const nameToImdb = require("name-to-imdb")

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/src/index.html")
// })
app.use(cors({origin: "*"}));
app.get("/api/:id", (req, res) => {
    let id = req.params.id
 
    nameToImdb(id,  (err, resp, inf) => {
        res.send(JSON.stringify(inf.meta))
    })
})


app.listen(8000, () => {
    console.log("listening on http://localhost:8000/")
})