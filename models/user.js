const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
  name: {
      type: String,
      required: true,
      default: "Default name"
  },
  email: {
      type: String,
      required: true,
      default: '' },
  pass: String
}, { collection: 'users' });

let UserModel = mongoose.model('User', UsersSchema);

module.exports = UserModel;