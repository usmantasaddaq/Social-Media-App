import express from 'express'
import { deleteUser, followUser, getAllUsers, getUser, unfollowUser, updateUser, followingUser, friendsuggestion, create, getfindAll, update, deletedepartment, friendrequest, getfriendrequest, responsefriendrequest , responsefriendrequests} from '../controllers/UserController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js';
import authMiddleWare2 from '../middleware/AuthMiddleware2.js';

const router = express.Router()

router.get('/:id', getUser);
router.get('/',getAllUsers)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unfollowUser)
router.get('/:id/following',followingUser)
router.get('/:id/friendsuggestion',friendsuggestion)
router.post('/department',create);
router.post('/notes',getfindAll);
router.put('/department/:noteId',update);
router.delete('/department/:noteId',deletedepartment);
router.post('/friendrequest',friendrequest)
router.post('/:id/getfriendrequest',getfriendrequest)
router.patch('/:id/responsefriendrequest',responsefriendrequest)
router.patch('/:id/responsefriendrequests',responsefriendrequests)
export default router