const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
// 
const app = express()
let port = process.env.PORT || 3000;
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/lyrics", async (req, res) => {
    const lyrics =
      (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({ lyrics })
    console.log(lyrics)
  })
  
  
  app.listen(port,()=>{
    console.log(`http://localhost:${port}/lyrics`)
  });