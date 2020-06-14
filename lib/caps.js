'use strict';

const vendorHandler = (payload) => {
  console.log('post', payload);
};

const inTransitHandler = (payload) => {
  console.log('in-transit', payload.orderId);
};

const pickupHandler = (payload) => {
  console.log('PickUp', payload.orderId);
};

const deliveredHandler = (payload) => {
  console.log('delivered', payload.orderId);
};

const vendorThankYou = () => {
  console.log('Thank You!!!');
};

module.exports = {
  vendorHandler,
  pickupHandler,
  inTransitHandler,
  deliveredHandler,
  vendorThankYou,
};