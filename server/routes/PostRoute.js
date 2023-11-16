import express from 'express'
import { createPost, deletePost, getPost, getAllPost,getTimelinePosts, likePost,commentPost, updatePost, closePost, reportPost, warningPost, comentBadge } from '../controllers/PostController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
const router = express.Router()

router.post('/',createPost)
router.get('/:id', getPost)
router.put('/:id/close', closePost)
router.post('/getAllPost', getAllPost)
router.put('/:id', updatePost)
router.put('/:id/warning', warningPost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.put('/:id/report', reportPost)
router.put('/:id/comment', commentPost)
router.put('/:id/badgeComment', comentBadge)
router.get('/:id/timeline', getTimelinePosts)

export default router