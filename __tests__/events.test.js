'use strict';

const caps = require('../lib/caps.js');
const pickupHandler = caps.pickupHandler;
const transitHandler = caps.inTransitHandler;
const deliveredHandler = caps.deliveredHandler;

let consoleSpy = jest.spyOn(console, 'log');

describe('test the Pickup handler function independently', () => {
  it('pickup handler works', () => {
    consoleSpy.mockClear();

    let payload = { date: '2020-06-14T17:19:29.788Z',
      store: 'Kulas, West and Kuhn',
      orderId: 44686,
      customer: 'Alexzander Leannon',
      address: '60945 Dicki Way East Carmen Oregon' };

    pickupHandler(payload);
    expect(consoleSpy).toHaveBeenCalled();
  });
});

describe('test the transit handler function independently', () => {
  it('transit handler works', () => {
    consoleSpy.mockClear();

    let payload = {
      date: '2020-06-14T17:19:29.788Z',
      store: 'Kulas, West and Kuhn',
      orderId: 44686,
      customer: 'Alexzander Leannon',
      address: '60945 Dicki Way East Carmen Oregon',
    };

    transitHandler(payload);
    setTimeout(() => {

      expect(consoleSpy).toHaveBeenCalledWith('DRIVER picked up order 2');
    }, 3000);
  });
});

describe('test the thank you handler function independently', () => {
  it('thank you handler works', () => {
    consoleSpy.mockClear();

    let payload = {
      date: '2020-06-14T17:19:29.788Z',
      store: 'Kulas, West and Kuhn',
      orderId: 44686,
      customer: 'Alexzander Leannon',
      address: '60945 Dicki Way East Carmen Oregon',
    };

    deliveredHandler(payload);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
    }, 3000);
  });
});