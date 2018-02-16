const net = require('net')

const clients = []
const server = net.createServer()
const httpServer = net.createServer()

server.listen(9339,'localhost')
httpServer.listen(8080,'localhost')

server.once('listening',() => {
    console.log('[TCP] Server started on', server.address().address + ':' + server.address().port)
})

server.on('connection', (client) => {
    console.log('[TCP] New client connected from', client.remoteAddress + ':' + client.remotePort)
    clients.push(client)
    client.on('data',(data) => {
        console.log(data.toString())
    })
})

httpServer.once('listening',() => {
    console.log('[HTTP] Server started on', httpServer.address().address + ':' + httpServer.address().port)
})

httpServer.on('connection', (client) => {
    console.log('[HTTP] New client connected from', client.remoteAddress + ':' + client.remotePort)
    client.on('data',(data) => {
        console.log(data.toString())
        client.write(Buffer.from('{"environment":"prod","assetUrl":"http:\/\/game-assets.haydaygame.com\/","serverHost":"game.haydaygame.com","status":"success"}'))
    })
})