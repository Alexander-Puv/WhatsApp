import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from "dotenv"
import express from 'express'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import ioConnection from './io'
import errorMiddleware from './middlewares/error-middleware'
import router from './router'
import path from 'path'

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
  } catch (e) {
    console.log(e);
  }
}
start()

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
export const io = new Server(server, {cors: {origin: process.env.CLIENT_URL}})
ioConnection(io)

// const wss = new WS.Server({
//   server: app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
// })

// wss.on('connection', (ws) => {
//   // send a message
//   ws.on('message', (message: string) => {
//     const msg: IMsg = JSON.parse(message)
//     broadcastMessage(msg)
//   })

//   // create a group
//   ws.on('group', (message: string) => {
//     const msg = JSON.parse(message) // type?
//     broadcastMessage(msg)
//   })

//   // create a chat
//   ws.on('chat', (message: string) => {
//     const msg = JSON.parse(message) // type?
//     broadcastMessage(msg)
//   })
// })

// const broadcastMessage = (msg: IMsg) => {
//   wss.clients.forEach(client => {
//     client.send(JSON.stringify(msg))
//   })
// }