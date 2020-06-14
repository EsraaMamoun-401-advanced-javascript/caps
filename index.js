'use strict';

const eventsEmmiter = require('./lib/events.js');
const vendorHandler = require('./lib/caps.js').vendorHandler;
const inTransitHandler1 = require('./lib/caps.js').inTransitHandler;
const delveredHandler = require('./lib/caps.js').deliveredHandler;

eventsEmmiter.on('new-order', vendorHandler);
eventsEmmiter.on('in-transit', inTransitHandler1);
eventsEmmiter.on('delivered', delveredHandler);

require('./lib/vendor.js');
require('./lib/driver.js');