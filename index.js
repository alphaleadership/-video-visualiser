const express = require("express");
const app = express();
const fs = require("fs");
const db=require("./db.js")
const getid=(id)=>{
  return new db.getpath(id)
}

app.set('view engine', 'ejs');
app.get("/", function (req, res) {
  res.render('index', {
    results: fs.readdirSync("C:\\Users\\MPA\\Videos\\file")
    
});
})
app.get("/watch", function (req, res) {
  res.render('view', {
    code: req.query.id
    
});
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video


  const videoPath = getid(req.query.id);
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
