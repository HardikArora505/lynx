const express = require("express")
const cors = require("cors")
const Genius = require("genius-lyrics");
const Client = new Genius.Client();
const app = express()
let port = process.env.PORT || 3001;
app.use(cors())
app.use(express.json())

async function getLyrics(artists, song) {
  try {
    let i = 0, lyrics = null
    while (i < artists.length && lyrics == null) {
      const songs = await Client.songs.search(`${song} ${artists[i].name}`);
      console.log("name===>", artists[i].name)
      console.log("songs", songs[0])

      if (songs[0]) {
        lyrics = await songs[0].lyrics()
        console.log(lyrics)
      }
      i++
    }
    if (!lyrics) {
      i = 0
      while (i < artists.length && lyrics == null) {
        const songs = await Client.songs.search(`${artists[i].name} ${song}`);
        console.log("name===>", artists[i].name)
        console.log("songs", songs[0])

        if (songs[0]) {
          lyrics = await songs[0].lyrics()
          console.log(lyrics)
        }
        i++
      }
    }
    return lyrics;
  } catch (error) {
    console.error(error);
    return null;
  }
}

app.post("/lyrics", async (req, res) => {
  console.log(req.body.artists.map(e => e.name))
  try {
    const lyrics = await getLyrics(req.body.artists, req.body.track)
    if (lyrics) {
      res.json({ lyrics: lyrics })

    }
    else {
      res.json({ lyrics: "No lyrics found" })
    }
  }
  catch (err) {
    console.log("ouch")
    res.json({ lyrics: "No lyrics found for the song" })
  }
})

// app.listen(3000)
app.listen(port, () => {
  console.log(`http://localhost:${port}/lyrics`)
});
