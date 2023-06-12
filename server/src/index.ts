import WS from 'ws'
import express from 'express'
import IMsg from './types/message'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import dotenv from "dotenv"

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

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
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
    if (msg.event === 'first-message') {
      // make what happens with first message?
    }
    broadcastMessage(msg)
  })

  // create a group
  ws.on('group', (message: string) => {
    const msg: IMsg = JSON.parse(message)
    broadcastMessage(msg)
  })
})

const broadcastMessage = (msg: IMsg) => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(msg))
  })
}