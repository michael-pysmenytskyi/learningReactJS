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


router.get('/', postsHandler.getAllPosts);
router.get('/getWithUsers', postsHandler.getPostsWithUser);
router.post('/', postsHandler.createPost);
router.delete('/:id', postsHandler.deletePost);
module.exports = router;