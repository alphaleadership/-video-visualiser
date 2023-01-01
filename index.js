const express = require("express");
const app = express();
const fs = require("fs");
const d=require("./db.js")
const base ="C:\\Users\\MPA\\Videos\\file\\"
const db=new d(base)
const morgan = require('morgan');
const accessLogStream=fs.createWriteStream("./log/access-"+`${new Date().toDateString()}`+".log")
const errorLogStream=fs.createWriteStream("./log/error"+`${new Date().toDateString()}`+".log")
app.use(morgan('combined', {stream: accessLogStream}));
app.use(morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }, stream: errorLogStream}));
db.readDatabase()
db.savedb()
db.database.map((item)=>{item.yid})
app.set('view engine', 'ejs');
app.get("/", function (req, res) {
 
  res.render('index', {
    results: db.database
    
});
})
app.get("/watch", function (req, res) {
  res.render('view', {
    code: req.query.id,
    videos:db.database
    
});
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  const videoPath =base+ db.getFile( req.query.id).fileName
  console.log(videoPath)
  console.log(req.query.id)
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
