import React from 'react';

import Animal from './Animal';
import { Td, Tr } from './CardTable.styles';
import styled from 'styled-components';

interface Props {
  animal: Animal;
  onSelectProperty?: (property: keyof Animal) => void;
  selectedProperty?: keyof Animal | '';
  darkMode: boolean;
  className?: string;
}

function CardTable({ animal, onSelectProperty, selectedProperty, darkMode, className }: Props) {
  return (
    <table className={className}>
      <tbody>
        {Object.keys(Animal.properties).map((property, index) => {
          const animalProperty = Animal.properties[property];
          const propertyValue = animal[property as keyof Animal];
          return (
            <Tr
              darkMode={darkMode}
              active={selectedProperty === property}
              key={property}
              className={property}
              onClick={() => {
                onSelectProperty && onSelectProperty(property as keyof Animal);
              }}
            >
              <Td>{animalProperty.label}</Td>
              <Td>
                {propertyValue}&nbsp;{animalProperty.unit}
              </Td>
            </Tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default styled(CardTable)`
  width: 100%;
  border-collapse: collapse;
`;
