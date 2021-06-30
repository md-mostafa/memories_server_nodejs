import express from 'express';

import { getPosts, createPost, updatePost, deletePost } from '../controllers/post.js';

const router = express.Router();

//localhost:5000/posts
/*
router.get('/', (req, res) => {
    res.send("Akash is the best");
});
*/

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);


export default router;