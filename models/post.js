const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let PostsSchema = new Schema({
  title: String,
  body: String,
  description: String,
  userId: {
      type: ObjectId,
      ref: 'User',
      default: null
  }
}, { collection: 'posts' });

let PostModel = mongoose.model('Post', PostsSchema);

module.exports = PostModel;