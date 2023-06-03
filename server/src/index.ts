import WS from 'ws'
import IMsg from './types/message'

const wss = new WS.Server({
  port: 5000
}, () => console.log('Server started on port 5000'))

wss.on('connection', (ws) => {
  ws.on('message', (message: string) => {
    const msg: IMsg = JSON.parse(message)
    broadcastMessage(msg)
    // switch (msg.event) {
    //   case 'message':
    //     break;
    //   case 'connectionToChat':
    //     break;
    //   case 'connectionToGroup':
    //     break;
    // }
  })
})

const broadcastMessage = (msg: IMsg) => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(msg))
  })
}