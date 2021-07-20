const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
// req.query.artist, req.query.track
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/lyrics", async (req, res) => {
    const lyrics =
      (await lyricsFinder("Alan Walker","Lily")) || "No Lyrics Found"
    res.json({ lyrics })
    console.log(lyrics)
  })
  
  let port = process.env.PORT;
  if (port == null || port == "") {
    port = 8000;
  }
  app.listen(port);