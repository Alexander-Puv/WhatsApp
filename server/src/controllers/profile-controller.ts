import ApiError from "../error/api-error"
import profileService from "../services/profile-service"
import upload from "../storage"
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
      const {refreshToken} = req.cookies
      const userData = await new Promise(async (resolve, reject) => {
        upload.single('photo')(req, res, async (err) => {
          if (err) {
            reject(err)
            throw ApiError.BadRequest(err.message)
          }
          const filePath = req.file.path
          await profileService.photo(refreshToken, filePath, resolve)
        })
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  description: controllerFunc = async (req, res, next) => {
    try {
      const {description} = req.body
      const {refreshToken} = req.cookies
      const userData = await profileService.description(refreshToken, description)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
}

export default new ProfileController()