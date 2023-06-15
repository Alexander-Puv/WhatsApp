import userModel from "../../models/user-model"
import tokenService from "../token-service"

const getUserWithRefresh = async (refreshToken: string | undefined) => {
  if (!refreshToken) {
    throw new Error('Unauthorized')
    // make error
  }

  const userData = tokenService.validateRefreshToken(refreshToken)
  const token = await tokenService.findToken(refreshToken)
  if (!userData || !token) {
    throw new Error('Unauthorized')
    // make error
  }

  return await userModel.findById(userData.uid)
}

export default getUserWithRefresh