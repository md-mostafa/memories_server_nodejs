import express from 'express';

import { getPosts, createPost } from '../controllers/post.js';

const router = express.Router();

//localhost:5000/posts
/*
router.get('/', (req, res) => {
    res.send("Akash is the best");
});
*/

router.get('/', getPosts);
router.post('/', createPost);


export default router;