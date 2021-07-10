import express from 'express';

import { getPostsBySearch, getPosts, createPost, updatePost, deletePost,likePost } from '../controllers/post.js';
import auth from '../middleware/auth.js'; //because we want to use our middleware

const router = express.Router();

//localhost:5000/posts
/*
router.get('/', (req, res) => {
    res.send("Akash is the best");
});
*/

router.get('/search', getPostsBySearch);
router.get('/', getPosts); //all the user no matter they are logged in or not they can see the post
router.post('/', auth,createPost); //but to create a post you need have your own id and need to be logged in
router.patch('/:id', auth, updatePost); //we need to check if he has the persmission to update the post
router.delete('/:id', auth, deletePost); //we need to check if he has the permission to delete the post
router.patch('/:id/likePost', auth, likePost); //every one can like but one can not like once or not


export default router;

//router.get('/:id', getPost);