import { Types } from "mongoose";

export default interface IUser {
  uid: string,
  username: string,
  createdAt: Date,
  photoURL: string | null
}

export interface IUserModel {
  _id: Types.ObjectId,
  username: string,
  createdAt: Date,
  photoURL: string | null
}