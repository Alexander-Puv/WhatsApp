import UserDto from "../../dtos/user-dto"
import { IUserModel } from "../../types/user"
import tokenService from "../token-service"

const createTokens = async (user: IUserModel) => {
  const userDto = new UserDto(user)
  const tokens = tokenService.generateTokens({...userDto})
  await tokenService.saveToken(userDto.uid, tokens.refreshToken)

  return {...tokens, user: userDto}
}

export default createTokens