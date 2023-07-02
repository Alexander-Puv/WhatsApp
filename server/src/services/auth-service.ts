import bcrypt from 'bcrypt';
import ApiError from '../error/api-error';
import userModel from "../models/user-model";
import tokenService from "./token-service";
import userService from './user-service';
import createTokens from "./utils/createTokens";

class AuthService {
  async register(username: string, password: string) {
    const candidate = await userModel.findOne({username})
    if (candidate) {
      throw ApiError.BadRequest('This username is already in use')
    }

    const hashPassword = await bcrypt.hash(password, 6)
    const user = await userModel.create({username, password: hashPassword})

    return await createTokens(user)
  }

  async login(username: string, password: string) {
    const user = await userModel.findOne({username})
    if (!user) {
      throw ApiError.BadRequest('This username is not found')
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Password is not correct')
    }

    return await createTokens(user)
  }

  async logout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken)
  }
  
  async refresh(refreshToken: string | undefined) {
    const user = await userService.getUserWithRefresh(refreshToken)
    return await createTokens(user)
  }
}

export default new AuthService()