import userService from "../services/user-service"
import ControllerFunc from "../types/controllerFunc"

class UserController {
  findUserById: ControllerFunc = async (req, res, next) => {
    try {
      const {id} = req.params
      const userData = await userService.findUserById(id)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()