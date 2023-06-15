import bcrypt from 'bcrypt';
import userModel from "../models/user-model";
import tokenService from "./token-service";
import createTokens from "./utils/createTokens";
import getUserWithRefresh from './utils/getUserWithRefresh';

class AuthService {
  async register(username: string, password: string) {
    const candidate = await userModel.findOne({username})
    if (candidate) {
      throw new Error('This username is already in use')
      // make error
    }

    const hashPassword = await bcrypt.hash(password, 6)
    const user = await userModel.create({username, password: hashPassword, createdAt: new Date()})

    return await createTokens(user)
  }

  async login(username: string, password: string) {
    const user = await userModel.findOne({username})
    if (!user) {
      throw new Error('This username is not found')
      // make error
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw new Error('Password is not correct')
      // make error
    }

    return await createTokens(user)
  }

  async logout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken)
  }
  
  async refresh(refreshToken: string | undefined) {
    const user = await getUserWithRefresh(refreshToken)
    return await createTokens(user)
  }
}

export default new AuthService()