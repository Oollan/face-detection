var multer = require("multer");
var upload = multer({ dest: "/tmp/" });
const express = require("express");
const app = express();
const fr = require("face-recognition");
const cors = require("cors");

app.use(cors());

app.post("/upload", upload.single("file"), (req, res) => {
  const image = fr.loadImage(req.file.path);
  const detector = new fr.FrontalFaceDetector();
  const gotFaceRects = detector.detect(image);
  res.json(gotFaceRects);
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server started at http://localhost:3000/")
);
