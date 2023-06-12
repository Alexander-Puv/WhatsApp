import { validationResult } from "express-validator"
import authService from "../services/auth-service"
import ControllerFunc from "../types/controllerFunc"

class AuthController {
  register: ControllerFunc = async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty) {
        return next(new Error('Validation error'))
        // make error
      }
      
      const {username, password} = req.body
      const userData = await authService.register(username, password)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000
      })

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  login: ControllerFunc = async (req, res, next) => {
    try {
      
    } catch (e) {
      next(e)
    }
  }

  logout: ControllerFunc = async (req, res, next) => {
    try {
      
    } catch (e) {
      next(e)
    }
  }

  refresh: ControllerFunc = async (req, res, next) => {
    try {
      
    } catch (e) {
      next(e)
    }
  }
}

export default new AuthController()