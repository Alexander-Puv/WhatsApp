import UserDto from "../dtos/user-dto";
import userModel from "../models/user-model";
import bcrypt from 'bcrypt'
import tokenService from "./token-service";
import { IUserModel } from "../types/user";

const createTokens = async (user: IUserModel) => {
  const userDto = new UserDto(user)
  const tokens = tokenService.generateTokens({...userDto})
  await tokenService.saveToken(userDto.id, tokens.refreshToken)

  return {...tokens, user: userDto}
}

class AuthService {
  async register(username: string, password: string) {
    const candidate = await userModel.findOne({username})
    if (candidate) {
      throw new Error('This username is already in use')
      // make error
    }

    const hashPassword = await bcrypt.hash(password, 6)
    const user = await userModel.create({username, password: hashPassword})

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
    if (!refreshToken) {
      throw new Error('Unauthorized')
      // make error
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    console.log(userData, ' userData\n'); // DELETE ME!!!
    const token = await tokenService.findToken(refreshToken)
    if (!userData || !token) {
      throw new Error('Unauthorized')
      // make error
    }

    const user = await userModel.findById(userData.id)
    return await createTokens(user)
  }
}

export default new AuthService()