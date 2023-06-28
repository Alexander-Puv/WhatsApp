import IUser from "../user";

export default interface UserData {
  user: IUser,
  accessToken: string,
  refreshToken: string
}