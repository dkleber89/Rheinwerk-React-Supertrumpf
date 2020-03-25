import React from 'react';
import renderer from 'react-test-renderer';
import Animal from './Animal';
import Card from './Card';

describe('Card', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const animal = new Animal('Elefant', 'Bild', 3.3, 6000, 70, 1, 40);

      const tree = renderer.create(<Card animal={animal} uncovered={true}/>).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
