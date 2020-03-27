import styled from 'styled-components';
import { Form, Field } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    padding: 3px;
  }
`;

export const StyledLabel = styled.label`
  width: 120px;
  display: inline-block;
`;

export const StyledRow = styled.div`
  &:nth-child(2n) {
    background-color: #ccc;
  }
`;

export const StyledField = styled(Field)`
  &.error {
    border: 1px solid red;
  }
`;

export const StyledError = styled.div`
  color: red;
`;
