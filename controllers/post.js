import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        //this is an asynchronus action
        //finding something inside model takes time
        const postMessages = await PostMessage.find(); 
        console.log(postMessages);

        res.status(200).json(postMessages);
    }catch(error){
        res.status(404).json({ message: error.message });
    }
    //res.send('Akash is the best');
}

export const createPost = async (req, res) => {
    const post = req.body;
    
    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    }catch(error) {
        //https://www.restapitutorial.com/httpstatuscodes.html
        res.status(409).json({ message: error.message });
    }
}