var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var PostsSchema = new Schema({
  title: String,
  body: String,
  description: String,
  userId: {
      type: ObjectId,
      ref: 'User',
      default: null
  }
}, { collection: 'posts' });

var PostModel = mongoose.model('Post', PostsSchema);

module.exports = PostModel;