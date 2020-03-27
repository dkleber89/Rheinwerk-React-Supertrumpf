import React from 'react';
import Animal from '../game/Animal';
import { StyledForm, StyledLabel, StyledRow } from './Form.styles';
import useCardAdmin from './useCardAdmin';

interface Props {
  onSubmit: (animal: Animal) => void;
  animal?: Animal;
}

const Form = ({ onSubmit, animal: initialAnimal }: Props) => {
  const [animal, changeProperty] = useCardAdmin(initialAnimal);

  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        onSubmit(animal);
      }}
    >
      <StyledRow>
        <StyledLabel htmlFor="name">Name:</StyledLabel>
        <input type="text" id="name" value={animal.name} onChange={changeProperty} />
      </StyledRow>
      <StyledRow>
        <StyledLabel htmlFor="image">Bild:</StyledLabel>
        <input type="file" id="image" onChange={changeProperty} />
      </StyledRow>
      {Object.keys(Animal.properties).map(property => {
        let value = (animal as any)[property];
        value = value === 0 ? '' : value;

        return (
          <StyledRow key={property}>
            <StyledLabel htmlFor={property}>{Animal.properties[property].label}:</StyledLabel>
            <input type="text" id={property} value={value} onChange={changeProperty} />
          </StyledRow>
        );
      })}
      <div>
        <button type="submit">speichern</button>
      </div>
    </StyledForm>
  );
};

export default Form;
