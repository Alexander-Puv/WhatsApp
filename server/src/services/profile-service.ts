import bcrypt from 'bcrypt';
import ApiError from '../error/api-error';
import userService from './user-service';
import UserDto from '../dtos/user-dto';

class ProfileService {
  async password(refreshToken: string | undefined, prevPassword: string, nextPassword: string) {
    if (prevPassword === nextPassword) {
      throw ApiError.BadRequest('Passwords are equal')
    }

    const user = await userService.getUserWithRefresh(refreshToken)
    const isPassEquals = await bcrypt.compare(prevPassword, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Password is not correct')
    }

    const hashPassword = await bcrypt.hash(nextPassword, 6)
    user.password = hashPassword
    return new UserDto(await user.save())
  }

  async photo(refreshToken: string | undefined, photo: string) {
    const user = await userService.getUserWithRefresh(refreshToken)
    user.photo = photo
    return new UserDto(await user.save())
  }

  async description(refreshToken: string, description: string) {
    const user = await userService.getUserWithRefresh(refreshToken)
    user.description = description
    return new UserDto(await user.save())
  }
}

export default new ProfileService()