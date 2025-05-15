import express from 'express';
import {createPost, getAllPosts,updatePost,likePost,deletePost} from '../controllers/posts.js';
import auth from '../middelware/auth.js';

const router=express.Router();


router.get('/getall',getAllPosts);
router.post('/createpost',auth,createPost);
router.patch('/updatepost/:id',updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likepost',auth, likePost);

export default router;
