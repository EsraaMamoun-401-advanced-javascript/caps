'use strict';

const eventsEmmiter = require('./events.js');

const faker = require('faker');

const thanks = require('./caps.js').vendorThankYou;

eventsEmmiter.on('delivered', thanks);

setInterval( () => {
  let date = faker.date.recent();
  console.log(date);
  let store = faker.company.companyName();
  let orderId = faker.random.number();
  let customer = faker.name.firstName() + ' ' + faker.name.lastName();
  let address = faker.address.streetAddress() + ' ' + faker.address.city() + ' ' + faker.address.state();

  eventsEmmiter.emit('new-order', {date, store, orderId, customer, address});
}, 3000);