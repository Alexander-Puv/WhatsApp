import userService from "../services/user-service"
import ControllerFunc from "../types/controllerFunc"

class UserController {
  findUser: ControllerFunc = async (req, res, next) => {
    try {
      const {id} = req.params
      const userData = await userService.findUser(id)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()