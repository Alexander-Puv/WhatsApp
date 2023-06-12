import { Types } from "mongoose";

export default interface IUser {
  uid: string,
  createdAt: Date,
  username: string,
  photoURL: string
}

export interface IUserModel {
  username: string,
  _id: Types.ObjectId
}