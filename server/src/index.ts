import WS from 'ws'
import express from 'express'
import IMsg from './types/message'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import dotenv from "dotenv"
import errorMiddleware from './middlewares/error-middleware'

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

const wss = new WS.Server({
  server: app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})

wss.on('connection', (ws) => {
  // send a message
  ws.on('message', (message: string) => {
    const msg: IMsg = JSON.parse(message)
    broadcastMessage(msg)
  })

  // create a group
  ws.on('group', (message: string) => {
    const msg = JSON.parse(message) // type?
    broadcastMessage(msg)
  })

  // create a chat
  ws.on('chat', (message: string) => {
    const msg = JSON.parse(message) // type?
    broadcastMessage(msg)
  })
})

const broadcastMessage = (msg: IMsg) => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(msg))
  })
}