var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  name: String,
  email: { type: String, required: true, default: '' },
  pass: { type: String, required: true}
}, { collection: 'users' });

var UserModel = mongoose.model('User', UsersSchema);

module.exports = UserModel;