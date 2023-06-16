import bcrypt from 'bcrypt';
import getUserWithRefresh from './utils/getUserWithRefresh';

class ProfileService {
  async password(refreshToken: string | undefined, prevPassword: string, nextPassword: string) {
    if (prevPassword === nextPassword) {
      throw new Error('Passwords are equal')
      // make error
    }

    const user = await getUserWithRefresh(refreshToken)
    const isPassEquals = await bcrypt.compare(prevPassword, user.password)
    if (!isPassEquals) {
      throw new Error('Password is not correct')
      // make error
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