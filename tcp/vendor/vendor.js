const net = require('net');
const faker = require('faker');
const client = new net.Socket();

client.connect({ port: 3000, host: 'localhost' }, () => {
    console.log('vendor connected to server');
});

let theSetInterval;

client.on('data', (data) => {
    let parsed = JSON.parse(data.toString());

    if (parsed.event === 'delivered') {
        console.log('Thank you for delivering order', parsed.order.payload.OrderID);
    }
});

theSetInterval = setInterval(() => {
    let order = {
        // time: faker.date.recent(),
        payload: {
            Store: faker.company.companyName(),
            OrderID: faker.random.uuid(),
            Customer: faker.name.findName(),
            Address: faker.address.streetAddress(),
        }
    };

    client.write(JSON.stringify({ event: 'pickup', order: order }));
}, 5000);

client.on('close', function () {
    clearInterval(theSetInterval);
    console.log('Vendor Connection got closed');
});

client.on('error', (error) => { console.log('DRIVER ERROR: ', error); });