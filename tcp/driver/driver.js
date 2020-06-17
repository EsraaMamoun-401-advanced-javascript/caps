const net = require('net');
const server = new net.Socket();

server.connect({ port: 3000, host: 'localhost' }, () => {
  console.log('driver connected to server');
});

let setTimeoutOne, setTimeoutTwo;

server.on('data', (payload) => {
  let event = JSON.parse(payload.toString());

  if (event.event === 'pickup') {

    setTimeoutOne = setTimeout(() => {
      let newPayload = { event: 'in-transit', order: event.order };
      console.log('picked up order', event.order.payload.OrderID);
      server.write(JSON.stringify(newPayload));
    }, 1000);
  }

  if (event.event === 'in-transit') {

    setTimeoutTwo = setTimeout(() => {
      let newPayload = { event: 'delivered', order: event.order };
      console.log('delivered order', event.order.payload.OrderID);
      server.write(JSON.stringify(newPayload));
    }, 3000);
  }
});


server.on('close', function () {
  clearTimeout(setTimeoutOne);
  clearTimeout(setTimeoutTwo);
  console.log('Driver Connection got closed');
});

server.on('error', (error) => {console.log('DRIVER ERROR: ', error);});