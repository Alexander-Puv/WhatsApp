import ApiError from "../../error/api-error"
import userModel from "../../models/user-model"
import tokenService from "../token-service"

const getUserWithRefresh = async (refreshToken: string | undefined) => {
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

export default getUserWithRefresh