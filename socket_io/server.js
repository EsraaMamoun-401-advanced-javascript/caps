'use strict';

const io = require('socket.io-client');
const express = require('express');
const cors = require('cors');
const faker = require('faker');

const socket = io.connect('http://localhost:3000/caps');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 3000;

app.post('/pickup', (req, res) => {
  let delivery = req.body || {
    Store: faker.company.companyName(),
    OrderID: faker.random.uuid(),
    Customer: faker.name.findName(),
    Address: faker.address.streetAddress(),
  };

  socket.emit('pickup', delivery);
  res.status(200).send('scheduled');
});

app.listen(PORT, () => console.log(`My app is up and running on ${PORT}`));