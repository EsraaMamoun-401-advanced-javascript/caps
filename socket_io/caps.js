'use strict';

const io = require('socket.io-client');

const caps = io.connect('http://localhost:3000/caps');

