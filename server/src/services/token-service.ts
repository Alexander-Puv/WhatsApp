import jwt from 'jsonwebtoken'
import AuthDto from '../dtos/user-dto'
import { Types } from 'mongoose'
import tokenModel from '../models/token-model'

interface ValidateReturn extends jwt.JwtPayload {
  id: string
}

class TokenService {
  generateTokens(payload: AuthDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
    return {accessToken, refreshToken}
  }

  validateAccessToken(token: string): ValidateReturn | null {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET) as ValidateReturn
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token: string): ValidateReturn | null {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET) as ValidateReturn
    } catch (e) {
      return null
    }
  }
  
  async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await tokenModel.findOne({userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return await tokenData.save()
    }

    return await tokenModel.create({userId, refreshToken})
  }

  async removeToken(refreshToken: string) {
    return await tokenModel.deleteOne({refreshToken})
  }

  async findToken(refreshToken: string) {
    return await tokenModel.findOne({refreshToken})
  }
}

export default new TokenService()