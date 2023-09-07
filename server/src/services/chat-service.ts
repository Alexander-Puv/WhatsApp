import { io } from ".."
import ChatDto from "../dtos/chat-dto"
import ApiError from "../error/api-error"
import chatModel from "../models/chat-model"
import userModel from "../models/user-model"
import userService from "./user-service"

class ChatService {
  // post
  async chat(refreshToken: string, receiverId: string) {
    const sender = await userService.getUserWithRefresh(refreshToken)
    if (!receiverId) {
      throw ApiError.BadRequest('Another group member must be specified')
    }

    const chatExists = await chatModel.findOne({
      members: { $all: [sender._id, receiverId] },
      isGroup: false
    })
    if (chatExists) {
      throw ApiError.BadRequest('Chat already exists')
    }

    const chat = await chatModel.create({members: [sender._id, receiverId]})
    io.emit('newChat', chat)

    await userModel.findByIdAndUpdate(receiverId, {
      $push: {chats: chat._id}
    })
    await sender.updateOne({$push: {chats: chat._id}})

    return new ChatDto(chat)
  }

  async group(refreshToken: string, memberIds: string[], name: string, photo: string | undefined) {
    const sender = await userService.getUserWithRefresh(refreshToken)
    if (!name) {
      throw ApiError.BadRequest('Group name is not specified')
    }
    if (!memberIds.length) {
      throw ApiError.BadRequest('Other group members must be listed')
    }

    const group = await chatModel.create({members: [sender._id, ...memberIds], isGroup: true, name, photo})
    io.emit('newGroup', group)

    sender.updateOne({$push: {chats: group._id}})
    memberIds.forEach(async (memberId) => {
      await userModel.findByIdAndUpdate(memberId, {
        $push: {chats: group._id}
      })
    })

    return new ChatDto(group)
  }

  // get
  async findChatById(id: string) {
    const chat = await chatModel.findById(id)
    if (!chat) {
      throw ApiError.BadRequest('Chat not found')
    }
    
    return new ChatDto(chat)
  }

  async findGroupByName(name: string, page: number, pageSize: number) {
    const groups = await chatModel.find({name})
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .exec()
    return groups.map(group => new ChatDto(group))
  }

  async findChatByUser(id: string, refreshToken: string) {
    const user = await userService.getUserWithRefresh(refreshToken)
    return await chatModel.findOne({members: {$all: [id, user._id]}, isGroup: false})
  }

  // put
  async join(refreshToken: string, groupId: string) {
    const user = await userService.getUserWithRefresh(refreshToken)
    const group = await chatModel.findByIdAndUpdate(groupId, {$push: {members: user._id}}, {new: true})

    await user.updateOne({$push: {chats: group._id}})
    io.emit('join', group)
    
    return new ChatDto(group)
  }

  async photo(groupId: string, photo: string) {
    const group = await chatModel.findById(groupId)
    group.photo = photo
    return new ChatDto(await group.save())
  }

  async description(groupId: string, description: string) {
    return new ChatDto(await chatModel.findByIdAndUpdate(groupId, {$set: {description}}, {new: true}))
  }

  // delete
  async deleteChat(refreshToken: string, chatId: string) {
    const user = await userService.getUserWithRefresh(refreshToken)
    await user.updateOne({$pull: {chats: chatId}})
    return user
  }

  async deleteGroup(groupId: string) {
    return new ChatDto(await chatModel.findByIdAndUpdate(groupId, {$set: {isDeleted: true}}, {new: true}))
  }

  async leaveGroup(refreshToken: string, groupId: string) {
    const user = await userService.getUserWithRefresh(refreshToken)
    await user.updateOne({$pull: {chats: groupId}})
    return new ChatDto(await chatModel.findByIdAndUpdate(groupId, {$pull: {members: user._id}}, {new: true}))
  }
}

export default new ChatService()