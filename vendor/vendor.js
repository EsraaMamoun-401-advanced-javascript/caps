'use strict';

const events = require('./events.js');
const faker = require('faker');


events.on('delivered',consoleThanks);

function consoleThanks(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
}

setInterval(() => {
  let data = {
    storeName : faker.company.companyName(),
    orderId : faker.random.uuid(),
    customerName : faker.name.findName(),
    address : faker.address.streetAddress(),
  };
  events.emit('pickup', data);
}, 5000);