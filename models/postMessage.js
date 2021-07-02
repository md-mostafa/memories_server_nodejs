import mongoose from 'mongoose';

//creating mongoose schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,//we are gonna convert all image to string
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

//turning this schema to a model

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;