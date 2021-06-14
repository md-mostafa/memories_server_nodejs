import express from 'express';

import { getPosts } from '../controllers/post.js';

const router = express.Router();

//localhost:5000/posts
/*
router.get('/', (req, res) => {
    res.send("Akash is the best");
});
*/

router.get('/', getPosts);


export default router;