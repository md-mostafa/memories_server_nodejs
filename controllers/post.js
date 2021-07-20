import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {

        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;  //GET the start index of every page
        const total = await PostMessage.countDocuments({});

        //this is an asynchronus action
        //finding something inside model takes time
        ///const postMessages = await PostMessage.find(); 
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex); //this will give us newest post first since we are sorting them bases on id
        //console.log(postMessages);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    }catch(error){
        res.status(404).json({ message: error.message });
    }
    //res.send('Akash is the best');
}

//query -> /posts?page=1 -> page = 1        //this is for search
//params -> /posts/123 -> id = 123          //this is for specific
export const getPostsBySearch = async (req, res) => {

    const { searchQuery, tags } = req.query;

    try{
        const title = new RegExp(searchQuery, 'i'); //i = ignore case
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') }}] });
        //find me all the posts that mactch one of those two criteria
        //first one is the title
        //second one is tags
        //is one of the tags in the array of tags equal to tags 

        res.json({ data: posts });
    }catch(error){
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    
    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    }catch(error) {
        //https://www.restapitutorial.com/httpstatuscodes.html
        res.status(409).json({ message: error.message });
    }
}


export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
    
    res.json(updatedPost);
}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    await PostMessage.findByIdAndRemove(id);

    //console.log('DELETE');//to debugg

    res.json({ message: 'Post deleted Successfully!!' });
}

//like post controller
export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));      //we want to see if the user id is already in like section or not
    if(index === -1) {
        //like the post
        post.likes.push(req.userId);
    } else {
        //dislike a post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true});

    res.json(updatedPost);
}