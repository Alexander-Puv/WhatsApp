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
      
    } catch (e) {
      next(e)
    }
  }

  findChat: controllerFunc = async (req, res, next) => {
    try {
      
    } catch (e) {
      next(e)
    }
  }
}

export default new ChatController()