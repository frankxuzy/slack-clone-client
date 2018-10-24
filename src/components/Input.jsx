import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
`;

const Input = () => (
  <InputWrapper className="input box">
    <input type="text" placeholder="Have you tried the CSS Grid Layout Module?" />
  </InputWrapper>
);

export default Input;
