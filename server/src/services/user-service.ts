import UserDto from '../dtos/user-dto';
import ApiError from '../error/api-error';
import userModel from "../models/user-model";
import tokenService from "./token-service";

class UserService {
  async findUserById(id: string) {
    return new UserDto(await userModel.findById(id))
  }

  async findUserByUsername(username: string) {
    const user = await userModel.findOne({username})
    return user ? new UserDto(user) : undefined
  }

  async getUserWithRefresh (refreshToken: string | undefined) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError()
    }
  
    const userData = tokenService.validateRefreshToken(refreshToken)
    const token = await tokenService.findToken(refreshToken)
    if (!userData || !token) {
      throw ApiError.UnathorizedError()
    }
  
    return await userModel.findById(userData.uid)
  }
}

export default new UserService()