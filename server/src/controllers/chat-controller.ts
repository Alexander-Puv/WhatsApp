import chatService from "../services/chat-service"
import controllerFunc from "../types/controllerFunc"

class ChatController {
  chat: controllerFunc = async (req, res, next) => {
    try {
      const {receiverId} = req.body
      const {refreshToken} = req.cookies
      const chatData = await chatService.chat(refreshToken, receiverId)
      return res.json(chatData)
    } catch (e) {
      next(e)
    }
  }
  
  group: controllerFunc = async (req, res, next) => {
    try {
      const {memberIds, name, photo} = req.body
      const {refreshToken} = req.cookies
      const groupData = await chatService.group(refreshToken, memberIds, name, photo)
      return res.json(groupData)
    } catch (e) {
      next(e)
    }
  }

  join: controllerFunc = async (req, res, next) => {
    try {
      const groupId = req.params.id
      const {refreshToken} = req.cookies
      const groupData = await chatService.join(refreshToken, groupId)
      return res.json(groupData)
    } catch (e) {
      next(e)
    }
  }

  photo: controllerFunc = async (req, res, next) => {
    try {
      const groupId = req.params.id
      const {photo} = req.body
      const groupData = await chatService.photo(groupId, photo)
      return res.json(groupData)
    } catch (e) {
      next(e)
    }
  }

  deleteChat: controllerFunc = async (req, res, next) => {
    try {
      const chatId = req.params.id
      const {refreshToken} = req.cookies
      const chatData = await chatService.deleteChat(refreshToken, chatId)
      return res.json(chatData)
    } catch (e) {
      next(e)
    }
  }

  deleteGroup: controllerFunc = async (req, res, next) => {
    try {
      const groupId = req.params.id
      const groupData = await chatService.deleteGroup(groupId)
      return res.json(groupData)
    } catch (e) {
      next(e)
    }
  }

  leaveGroup: controllerFunc = async (req, res, next) => {
    try {
      const groupId = req.params.id
      const {refreshToken} = req.cookies
      const groupData = await chatService.leaveGroup(refreshToken, groupId)
      return res.json(groupData)
    } catch (e) {
      next(e)
    }
  }
}

export default new ChatController()