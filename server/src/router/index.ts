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
router.post('/chat', chatController.chat)
router.post('/chat/group', chatController.group)
router.put('/chat/group/:id/photo', chatController.photo)
router.delete('/chat/:id', chatController.deleteChat) // delete for one user
router.delete('/chat/group/:id', chatController.deleteGroup)
router.delete('/chat/group/:id/leave', chatController.leaveGroup)

// user profile
router.put('/profile/password', profileController.password)
router.put('/profile/photo', profileController.photo)

export default router