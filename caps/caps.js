const net = require('net');
const { exit } = require('process');
const server = net.createServer();

server.listen(3000, () => {
  console.log('server up and running on 3000');
});

let socketPool = [];

const logger = (payload) => {
  let event = JSON.parse(payload.toString());

  for (let i = 0; i < socketPool.length; i++) {
    let socket = socketPool[i];
    socket.write(payload);
  }

  if (event.event === 'pickup') {
    console.log('pickup');
    console.log('- Time:', new Date());
    console.log(event.order);
  }

  if (event.event === 'in-transit')
    console.log('in-transit order', event.order.payload.OrderID);

  if (event.event === 'delivered')
    console.log('delivered order', event.order.payload.OrderID);
};

server.on('connection', (socket) => {
  console.log('socket connected to me');
  socketPool.push(socket);
  socket.on('data', logger);

  socket.on('error', (error) => {console.log('CAPS ERROR: ', error);});

  socket.on('end', (end) => {
    console.log('Connection ended');
    exit();
  });
});

server.on('close', function() {
  console.log('Logger Connection got closed');
});