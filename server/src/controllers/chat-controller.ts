import chatService from "../services/chat-service"
import controllerFunc from "../types/controllerFunc"

class ChatController {
  // post
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

  // get
  findChatById: controllerFunc = async (req, res, next) => {
    try {
      const {id} = req.params
      const chatData = await chatService.findChatById(id)
      return res.json(chatData)
    } catch (e) {
      next(e)
    }
  }

  findGroupByName: controllerFunc = async (req, res, next) => {
    try {
      const {name, page, pageSize} = req.query
      const parsedPage = isNaN(Number(page)) ? 1 : Number(page);
      const parsedPageSize = isNaN(Number(pageSize)) ? 3 : Number(pageSize);
      const groupData = await chatService.findGroupByName(name as string, parsedPage, parsedPageSize)
      return res.json(groupData)
    } catch (e) {
      next(e)
    }
  }

  findChatByUser: controllerFunc = async (req, res, next) => {
    try {
      const {uid} = req.params
      const {refreshToken} = req.cookies
      const chatData = await chatService.findChatByUser(uid, refreshToken)
      return res.json(chatData)
    } catch (e) {
      next(e)
    }
  }

  // put
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

  description: controllerFunc = async (req, res, next) => {
    try {
      const groupId = req.params.id
      const {description} = req.body
      const groupData = await chatService.description(groupId, description)
      return res.json(groupData)
    } catch (e) {
      next(e)
    }
  }

  // delete
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