import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import UserDto from '../dtos/user-dto';
import ApiError from '../error/api-error';
import upload from '../storage';
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

  async photo(refreshToken: string | undefined, req: Request, res: Response) {
    return new Promise(async (resolve, reject) => {
      upload.single('photo')(req, res, async (err) => {
        if (err) {
          reject(err)
          return
        }

        const filePath = req.file.path
        const user = await userService.getUserWithRefresh(refreshToken)
        user.photo = process.env.API_URL + '/' + filePath.replace('\\', '/')
        resolve(new UserDto(await user.save()))
      })
    })
  }

  async description(refreshToken: string, description: string) {
    const user = await userService.getUserWithRefresh(refreshToken)
    user.description = description
    return new UserDto(await user.save())
  }
}

export default new ProfileService()