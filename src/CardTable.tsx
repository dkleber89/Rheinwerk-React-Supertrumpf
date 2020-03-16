import React from 'react';
import classNames from 'classnames';

import Animal from './Animal';
import styles from './CardTable.module.css';

interface Props {
  animal: Animal;
  onSelectProperty?: (property: keyof Animal) => void;
  selectedProperty?: keyof Animal | '';
  darkMode: boolean;
}

export default function CardTable({ animal, onSelectProperty, selectedProperty, darkMode }: Props) {
  const mode = darkMode ? 'dark' : 'light';

  return (
    <table className={styles.table}>
      <tbody>
        {Object.keys(Animal.properties).map((property, index) => {
          const animalProperty = Animal.properties[property];
          const propertyValue = animal[property as keyof Animal];
          return (
            <tr
              className={classNames(styles['tr-' + mode], styles.tr, selectedProperty === property ? styles.activeRow : '')}
              key={property}
              onClick={() => {
                onSelectProperty && onSelectProperty(property as keyof Animal);
              }}
            >
              <td className={styles.td}>{animalProperty.label}</td>
              <td className={styles.td}>
                {propertyValue}&nbsp;{animalProperty.unit}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
