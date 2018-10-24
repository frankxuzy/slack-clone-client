import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

const InputWrapper = styled.div`
`;

const SendMessage = ({ channelName }) => (
  <InputWrapper className="input box">
    <Input fluid placeholder={`Message #${channelName}`} />
  </InputWrapper>
);

export default SendMessage;
