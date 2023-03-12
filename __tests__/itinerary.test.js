/* globals describe it expect */
const Port = require('../src/port');
const Itinerary = require('../src/itinerary');

describe('Itinerary constructor',() => {
  it('can be instantiated', () => {
    expect(new Itinerary ('Bilbao')).toBeInstanceOf(Object);
  });
 
  it('can have ports', () => {

    const dover = jest.fn();
    const calais = jest.fn();
    const itinerary = new Itinerary([dover, calais]);

    expect(itinerary.ports).toEqual([dover, calais]);
  });
});
