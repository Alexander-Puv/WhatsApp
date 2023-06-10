import WS from 'ws'
import express from 'express'
import IMsg from './types/message'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))

const wss = new WS.Server({
  server: app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})

wss.on('connection', (ws) => {
  // send a message
  ws.on('message', (message: string) => {
    // make somthing if this is the first message?
    const msg: IMsg = JSON.parse(message)
    broadcastMessage(msg)
    // switch (msg.event) {
    //   case 'message':
    //     break;
    //   case 'connection':
    //     break;
  })

  // create a group
  ws.on('group', () => {

  })
})

const broadcastMessage = (msg: IMsg) => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(msg))
  })
}