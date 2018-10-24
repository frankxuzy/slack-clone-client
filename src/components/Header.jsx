import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`

`;

const Header = ({ channelName }) => (
  <HeaderWrapper className="header box">
    <h1>{`#${channelName}`}</h1>
  </HeaderWrapper>
);

export default Header;
