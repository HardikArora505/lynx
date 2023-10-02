const express = require("express")
const cors = require("cors")
const Genius = require("genius-lyrics");
const Client = new Genius.Client();
const app = express()
let port = process.env.PORT || 3001;
app.use(cors())
app.use(express.json())

async function getLyrics(artist, song) {
  try {
      const songs = await Client.songs.search(`${artist} ${song}`);
      const firstSong = songs[0];
      const lyrics = await firstSong.lyrics();
      return lyrics;
  } catch (error) {
      console.error(error);
      return null;
  }
}

app.get("/lyrics", async (req, res) => {
  try {
    const lyrics=await getLyrics(req.query.track,req.query.artist)
     res.send(lyrics)

     console.log("\n", lyrics, "\n");

 }
 catch (err) {
     res.send("No lyrics found")
 }
  })
  
  // app.listen(3000)
  app.listen(port,()=>{
    console.log(`http://localhost:${port}/lyrics`)
  });
