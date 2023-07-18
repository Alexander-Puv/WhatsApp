import bcrypt from 'bcrypt';
import fs from 'fs';
import UserDto from '../dtos/user-dto';
import ApiError from '../error/api-error';
import userService from './user-service';

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

  async photo(refreshToken: string | undefined, filePath: string, resolve: (val: unknown) => void) {
    const user = await userService.getUserWithRefresh(refreshToken)
    if (user.photo) {
      const existingPhotoPath = user.photo.replace(process.env.API_URL + '/', '')
      fs.unlink(existingPhotoPath, (err) => {
        if (err) {
          throw ApiError.BadRequest(err.message)
        }
      })
    }

    user.photo = process.env.API_URL + '/' + filePath.replace('\\', '/')
    resolve(new UserDto(await user.save()))
  }

  async description(refreshToken: string, description: string) {
    const user = await userService.getUserWithRefresh(refreshToken)
    user.description = description
    return new UserDto(await user.save())
  }
}

export default new ProfileService()