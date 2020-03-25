import React from 'react';
import renderer from 'react-test-renderer';
import Animal from './Animal';
import CardTable from './CardTable';
import { render, fireEvent } from '@testing-library/react';

describe('CardTable', () => {
  it('should higlight a certain row correctly', () => {
    const animal = new Animal('Elefant', 'Bild', 3.3, 6000, 70, 1, 40);

    const component = renderer.create(<CardTable animal={animal} darkMode={false} selectedProperty="size" />);
    const rootInstance = component.root;
    const activeRow = rootInstance.findByProps({ active: true });

    expect(activeRow.props.className).toBe('size');
  });

  it('should handle a click correctly', () => {
    const clickHandler = jest.fn();
    const animal = new Animal('Elefant', 'Bild', 3.3, 6000, 70, 1, 40);

    const component = renderer.create(<CardTable animal={animal} darkMode={false} onSelectProperty={clickHandler} />);
    const rootInstance = component.root;
    const sizeRow = rootInstance.findByProps({ className: 'size' });

    sizeRow.props.onClick();

    expect(clickHandler).toHaveBeenCalledWith('size');
  });

  describe('interaction with react-testing-library', () => {
    it('should emulate a click event', () => {
      const clickHandler = jest.fn();
      const animal = new Animal('Elefant', 'Bild', 3.3, 6000, 70, 1, 40);
      const { container } = render(<CardTable animal={animal} darkMode={false} onSelectProperty={clickHandler} />);

      fireEvent.click(container.querySelector('.size')!);

      expect(clickHandler).toBeCalledWith('size');
    });
  });
});
