const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

let FilesSchema = new Schema({
    name: String,
    fileData:{
        type: String,
        default: null
    },
    userId: {
        type: ObjectId,
        ref: 'User',
        default: null
    },
    postId: {
        type: ObjectId,
        required: 'true',
        ref: 'Post',
        default: null
    }
}, { collection: 'files' });

let FileModel = mongoose.model('File', FilesSchema);

module.exports = FileModel;