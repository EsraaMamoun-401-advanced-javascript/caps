const net = require('net');
const faker = require('faker');
const client = new net.Socket();

client.connect({ port: 3000, host: 'localhost' }, () => {
    console.log('connected to server');
});

client.on('data', (payload) => {
    let parsed = JSON.parse(payload.toString());

    if (parsed.event === 'delivered') {
        console.log('Thank you for delivering order', parsed.order.id);
    }
});

setInterval(() => {
    let order = {
        time: faker.date.recent(),
        store: faker.company.companyName(),
        id: faker.random.uuid(),
        name: faker.name.findName(),
        address: faker.address.streetAddress(),
    };
    
    client.write(JSON.stringify({ event: 'pickup', order: order }));
}, 5000);
