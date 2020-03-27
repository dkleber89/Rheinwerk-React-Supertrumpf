import React from 'react';
import Animal from '../game/Animal';
import { StyledForm, StyledLabel, StyledRow, StyledField, StyledError } from './Form.styles';
import { Formik, ErrorMessage } from 'formik';
import validationSchema from './validationSchema';

interface Props {
  onSubmit: (animal: Animal) => void;
  animal?: Animal;
}

const Form = ({ onSubmit, animal = new Animal('', '', '', '', '', '', '') }: Props) => {
  return (
    <Formik
      initialValues={animal}
      validationSchema={validationSchema}
      onSubmit={(e, actions) => {
        onSubmit(e);
        actions.setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, setFieldValue }) => (
        <StyledForm>
          <StyledRow>
            <StyledLabel htmlFor="name">Name:</StyledLabel>
            <StyledField id="name" type="text" name="name" className={errors.name && 'error'} />
            <ErrorMessage name="name" component={StyledError} />
          </StyledRow>
          <StyledRow>
            <StyledLabel htmlFor="image">Bild:</StyledLabel>
            <input
              type="file"
              id="image"
              onChange={event => {
                setFieldValue('image', event.currentTarget.files![0]);
              }}
            />
            <ErrorMessage name="image" component={StyledError} />
          </StyledRow>
          {(Object.keys(Animal.properties) as (keyof Animal)[]).map(property => {
            return (
              <StyledRow key={property}>
                <StyledLabel htmlFor={property}>{Animal.properties[property].label}:</StyledLabel>
                <StyledField type="text" id={property} name={property} className={errors[property] && 'error'} />
                <ErrorMessage name={property} component={StyledError} />
              </StyledRow>
            );
          })}
          <div>
            <button type="submit" disabled={isSubmitting}>
              speichern
            </button>
          </div>
        </StyledForm>
      )}
    </Formik>
  );
};

export default Form;
