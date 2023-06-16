import express from 'express'
import authController from '../controllers/auth-controller'
import chatController from '../controllers/chat-controller'
import profileController from '../controllers/profile-controller'

const router = express.Router()

// authorization
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/logout', authController.logout)
router.get('/auth/refresh', authController.refresh)

// chats
router.get('/chat/:id', chatController.findChat) // find a chat/group

// user profile
router.post('/profile/password', profileController.password)
router.post('/profile/photo', profileController.photo)

export default router