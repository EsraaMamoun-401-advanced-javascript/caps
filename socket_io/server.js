'use strict';

const io = require('socket.io')(3000);

require('./caps.js')(io);

// io.on('connection', (socket) => {

// })