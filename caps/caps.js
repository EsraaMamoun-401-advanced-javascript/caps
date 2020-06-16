const net = require('net');
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
    // console.log('pickup');
    console.log('- Time:', new Date());
    // console.log('- Store:', event.order.store);
    // console.log('- OrderID:', event.order.id);
    // console.log('- Customer:', event.order.name);
    // console.log('- Address:', event.order.address);
    console.log(event.order);
    
  }

  if (event.event === 'in-transit')
    console.log('in-transit order', event.order.id);

  if (event.event === 'delivered')
    console.log('delivered order', event.order.id);
};

server.on('connection', (socket) => {
  console.log('socket connected to me');
  socketPool.push(socket);
  socket.on('data', logger);

  socket.on('error', (e) => {console.log('CAPS ERROR: ', e);});

  socket.on('end', (err) => {
    console.log('connection ended', err);
    if(err) return err;
  });
});

server.on('close', function() {
  console.log('Logger Connection got closed');
});