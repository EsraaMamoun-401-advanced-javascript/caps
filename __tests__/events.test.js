'use strict';

require('../caps');
const events = require('../src/events');

let spy = jest.spyOn(console, 'log').mockImplementation();

let data = {
  storeName: 'OpheliaStore',
  customerName: 'Alexzander Leannon',
  orderId: '3031995',
  address: '60945 Dicki Way East Carmen Oregon',
};

describe('caps test', () => { 
  it('pickup', () => {
    events.emit('pickup', data);
    expect(spy).toHaveBeenCalled();
  });

  it('in-transit', () => {
    events.emit('in-transit', data);
    expect(spy).toHaveBeenCalled();
  });

  it('delivered', () => {
    events.emit('delivered', data);
    expect(spy).toHaveBeenCalled();
  }); 
});