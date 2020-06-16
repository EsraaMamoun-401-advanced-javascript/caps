const net = require('net');
const server = new net.Socket();

server.connect({ port: 3000, host: 'localhost' }, () => {
  console.log('connected to server');
});

server.on('data', (payload) => {
  let event = JSON.parse(payload.toString());

  if (event.event === 'pickup') {

    setTimeout(() => {
      let newPayload = { event: 'in-transit', order: event.order };
      console.log('picked up order', event.order.id);
      server.write(JSON.stringify(newPayload));
    }, 1000);
  }

  if (event.event === 'in-transit') {

    setTimeout(() => {
      let newPayload = { event: 'delivered', order: event.order };
      console.log('delivered order', event.order.id);
      server.write(JSON.stringify(newPayload));
    }, 3000);
  }
});
