import bcrypt from 'bcrypt';
import getUserWithRefresh from './utils/getUserWithRefresh';
import ApiError from '../error/api-error';

class ProfileService {
  async password(refreshToken: string | undefined, prevPassword: string, nextPassword: string) {
    if (prevPassword === nextPassword) {
      throw ApiError.BadRequest('Passwords are equal')
    }

    const user = await getUserWithRefresh(refreshToken)
    const isPassEquals = await bcrypt.compare(prevPassword, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Password is not correct')
    }

    const hashPassword = await bcrypt.hash(nextPassword, 6)
    user.password = hashPassword
    return await user.save();
  }

  async photo(refreshToken: string | undefined, photo: string) {
    const user = await getUserWithRefresh(refreshToken)
    user.photo = photo
    return await user.save()
  }
}

export default new ProfileService()