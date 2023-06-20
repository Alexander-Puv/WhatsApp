import { io } from ".."
import ApiError from "../error/api-error"
import chatModel from "../models/chat-model"
import userModel from "../models/user-model"
import getUserWithRefresh from "./utils/getUserWithRefresh"

class ChatService {
  async chat(refreshToken: string, receiverId: string) {
    const sender = await getUserWithRefresh(refreshToken)
    if (!receiverId) {
      throw ApiError.BadRequest('Another group member must be specified')
    }

    const chat = await chatModel.create({members: [sender._id, receiverId]})
    io.emit('newChat', chat)

    const receiver = await userModel.findById(receiverId)
    receiver.chats.push(chat._id)
    await receiver.save()
    sender.chats.push(chat._id)
    await sender.save()

    return chat
  }

  async group(refreshToken: string, memberIds: string[], name: string, photo: string | undefined) {
    const sender = await getUserWithRefresh(refreshToken)
    if (!name) {
      throw ApiError.BadRequest('Group name is not specified')
    }
    if (!memberIds.length) {
      throw ApiError.BadRequest('Other group members must be listed')
    }

    const group = await chatModel.create({members: [sender._id, ...memberIds], isGroup: true, name, photo})
    io.emit('newGroup', group)

    sender.chats.push(group._id)
    await sender.save()
    memberIds.forEach(async (memberId) => {
      const member = await userModel.findById(memberId)
      member.chats.push(group._id)
      await member.save()
    })

    return group
  }

  async photo(groupId: string, photo: string) {
    const group = await chatModel.findById(groupId)
    group.photo = photo
    return await group.save()
  }
}

export default new ChatService()