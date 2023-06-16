import { Schema, model } from "mongoose"

const UserSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  createdAt: {type: Date, required: true},
  photo: {type: String, default: null}
})

export default model('User', UserSchema)