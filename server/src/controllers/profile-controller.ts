import profileService from "../services/profile-service"
import controllerFunc from "../types/controllerFunc"

class ProfileController {
  password: controllerFunc = async (req, res, next) => {
    try {
      const {prevPassword, nextPassword} = req.body
      const {refreshToken} = req.cookies
      const userData = await profileService.password(refreshToken, prevPassword, nextPassword)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  photo: controllerFunc = async (req, res, next) => {
    try {
      const photo = req.file
      const {refreshToken} = req.cookies
      const userData = await profileService.photo(refreshToken, photo)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
}

export default new ProfileController()