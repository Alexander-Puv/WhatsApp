import messageService from "../services/message-service"
import controllerFunc from "../types/controllerFunc"

class MessageController {
  send: controllerFunc = async (req, res, next) => {
    try {
      const {content, chatId} = req.body
      const {refreshToken} = req.cookies
      const chatData = await messageService.send(refreshToken, content, chatId)
      return res.json(chatData)
    } catch (e) {
      next(e)
    }
  }

  findById: controllerFunc = async (req, res, next) => {
    try {
      const messageId = req.params.id
      const {refreshToken} = req.cookies
      const chatData = await messageService.findById(refreshToken, messageId)
      return res.json(chatData)
    } catch (e) {
      next(e)
    }
  }
}

export default new MessageController()