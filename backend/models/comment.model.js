const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    postId:{
        type:Schema.Types.ObjectId,
        ref:'detail'
    },
    responseTo:{
        type:Schema.Types.ObjectId,
        ref: 'user'
    },
    content:{
        type:String
    }
},{timeStamps:true,})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;