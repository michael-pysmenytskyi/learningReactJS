var PostsHandler = require('../handlers/posts');
var express = require('express');
var router = express.Router();
var postsHandler = new PostsHandler();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', postsHandler.getAllPosts);
router.get('/getWithUsers', postsHandler.getPostsWithUser);
router.post('/', postsHandler.createPost);
router.post('/upload', upload.single("file"), postsHandler.upload);

module.exports = router;