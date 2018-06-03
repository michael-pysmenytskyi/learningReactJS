var FilesHandler = require('../handlers/files');
var express = require('express');
var router = express.Router();
var filesHandler = new FilesHandler();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', filesHandler.getAllFiles);
//router.get('/getWithUsers', postsHandler.getPostsWithUser);
router.post('/', filesHandler.createFile);
router.post('/upload', upload.single("file"), filesHandler.upload);

module.exports = router;