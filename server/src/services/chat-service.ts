import { io } from ".."
import ApiError from "../error/api-error"
import chatModel from "../models/chat-model"
import userModel from "../models/user-model"
import getUserWithRefresh from "./utils/getUserWithRefresh"

class ChatService {
  async chat(refreshToken: string, receiverId: string) {
    const user = await getUserWithRefresh(refreshToken)
    // const receiver = await userModel.findById(receiverId)
    // if (!receiver) {
    //   throw ApiError.BadRequest('Receiver is not found')
    // }

    const chat = await chatModel.create({members: [user._id, receiverId]})
    io.emit('newChat', chat)
    return chat
  }
}

export default new ChatService()