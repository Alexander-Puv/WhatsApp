import bcrypt from 'bcrypt'
import { photoDestination } from '../middlewares/photo-middleware'
import getUserWithRefresh from './utils/getUserWithRefresh'
import fs from 'fs';
import path from 'path';

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

  async photo(refreshToken: string | undefined, photo: Express.Multer.File) {
    const user = await getUserWithRefresh(refreshToken)
    
    const prevPhoto = user.photoURL
    if (prevPhoto) {
      const baseUrl = process.env.API_URL + '/';
      const filePath = prevPhoto.replace(baseUrl, '');
      fs.unlink(filePath, (err) => {
        if (err) {
          throw err;
        }
      });
    }

    const photoURL = `${process.env.API_URL}/${photoDestination}/${photo.filename}`
    user.photoURL = photoURL
    return await user.save()
  }
}

export default new ProfileService()