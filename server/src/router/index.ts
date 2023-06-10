import express from 'express'

const router = express.Router()

// authorization
router.post('/auth/register')
router.post('/auth/login')
router.post('/auth/logout')
router.get('/auth/refresh')

// chats
router.get('/chats/chat/:id') // find a chat/group

// user profile
router.post('/profile/username')
router.post('/profile/password')
router.post('/profile/photo')

export default router