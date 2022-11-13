import * as net from 'net'

export class CrowMQServer{
  private readonly server: net.Server

  constructor(){
    this.server = net.createServer()
    this.server.on('connection', this.handleConnection)
  }

  start(port?: number | string, callback?: Function): void{
    this.server.listen(port || 8080)
  }

  private handleConnection(connection: net.Socket): void{
    console.log('new connection detected')
    connection.on('close', ()=>{
      console.log('Client has close connection')
    })
  }

  close(): void{
    this.server.close(()=>{
      console.log('Server is closed')
      process.exit(0)
    })
  }
}