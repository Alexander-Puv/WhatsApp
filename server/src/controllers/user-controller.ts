import userService from "../services/user-service"
import ControllerFunc from "../types/controllerFunc"

class UserController {
  findUserById: ControllerFunc = async (req, res, next) => {
    try {
      const {id} = req.params
      const userData = await userService.findUserById(id as string)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  findUserByUsername: ControllerFunc = async (req, res, next) => {
    try {
      const {username} = req.query
      const userData = await userService.findUserByUsername(username as string)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()