'use strict';

const faker = require('faker');
const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/caps');

const store = faker.company.companyName();

socket.emit('join', store);

socket.on('delivered', (payload) => {
  console.log('Thank you for delivering order', payload.OrderID);
});

setInterval(() => {
  let delivery = {
    Store: faker.company.companyName(),
    OrderID: faker.random.uuid(),
    Customer: faker.name.findName(),
    Address: faker.address.streetAddress(),
  };
  socket.emit('pickup', delivery);
}, 5000);
