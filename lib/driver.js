'use strict';

const eventsEmmiter = require('./events.js');

const driverpickedUp = require('./caps.js').pickupHandler;

const deliveryDriver = (payload) => {
  eventsEmmiter.emit('in-transit', payload);
  setTimeout(() => {
    eventsEmmiter.emit('delivered', payload);
  }, 3000);
};

eventsEmmiter.on('new-order', driverpickedUp);
eventsEmmiter.on('new-order', deliveryDriver);