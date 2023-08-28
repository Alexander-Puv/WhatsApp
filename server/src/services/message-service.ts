import MessageDto from '../dtos/message-dto';
import chatModel from '../models/chat-model';
import messageModel from '../models/message-model';
import userService from './user-service';

class MessageService {
  async send(refreshToken: string | undefined, content: string, chatId: string) {
    const user = await userService.getUserWithRefresh(refreshToken)
    const chat = await chatModel.findById(chatId)

    const message = await messageModel.create({senderId: user._id, content, chatId: chat._id})
    chat.messages.push(message)
    await chat.save()
    
    return new MessageDto(message)
  }

  async findById(refreshToken: string | undefined, messageId: string) {
    return new MessageDto(await messageModel.findById(messageId))
  }
}

export default new MessageService()