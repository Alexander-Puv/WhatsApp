import express from 'express'
import authController from '../controllers/auth-controller'
import chatController from '../controllers/chat-controller'
import profileController from '../controllers/profile-controller'
import userController from '../controllers/user-controller'
import validator from './validator'

const router = express.Router()

// authorization
router.post('/auth/register', validator, authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/logout', authController.logout)
router.get('/auth/refresh', authController.refresh)

// chats
router.post('/chat', chatController.chat)
router.post('/chat/group', chatController.group)

router.get('/chat/:id', chatController.findChatById)
router.get('/chat/find/:uid', chatController.findChatByUser)
router.get('/chat/group/find', chatController.findGroupByName)

router.put('/chat/group/:id', chatController.join)
router.put('/chat/group/:id/photo', chatController.photo)

router.delete('/chat/:id', chatController.deleteChat) // delete for one user
router.delete('/chat/group/:id', chatController.deleteGroup)
router.delete('/chat/group/:id/leave', chatController.leaveGroup)

// users
router.get('/user', userController.findUserByUsername)
router.get('/user/:id', userController.findUserById)

// user profile
router.put('/profile/password', profileController.password)
router.put('/profile/photo', profileController.photo)

export default router