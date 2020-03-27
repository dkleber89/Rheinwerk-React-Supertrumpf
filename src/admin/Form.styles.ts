import styled from 'styled-components';

export const StyledForm = styled.form`
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
