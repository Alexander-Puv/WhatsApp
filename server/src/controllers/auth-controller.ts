import { validationResult } from "express-validator"
import authService from "../services/auth-service"
import ControllerFunc from "../types/controllerFunc"
import ApiError from "../error/api-error"

class AuthController {
  register: ControllerFunc = async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return next(ApiError.BadRequest('Validation error', errorMessages))
      }
      
      const {username, password} = req.body
      const userData = await authService.register(username, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  login: ControllerFunc = async (req, res, next) => {
    try {
      const {username, password} = req.body
      const userData = await authService.login(username, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  logout: ControllerFunc = async (req, res, next) => {
    try {
      const {refreshToken} = req.cookies
      const token = await authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  refresh: ControllerFunc = async (req, res, next) => {
    try {
      const {refreshToken} = req.cookies
      const userData = await authService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
}

export default new AuthController()