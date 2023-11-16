import express from 'express'
import { createAnnouncements, getAllAnnouncements } from '../controllers/AnnouncementController.js'
const router = express.Router()

router.post('/',createAnnouncements)
router.get('/', getAllAnnouncements)
export default router