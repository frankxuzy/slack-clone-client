import React from 'react';
import styled from 'styled-components';

const ChannelWrapper = styled.div`
    color: #958993
`;
const channel = ({ id, name }) => (
  <li key={`channel-${id}`}>
    {name}
  </li>
);

const user = ({ id, name }) => (
  <li key={`user-${id}`}>
    {name}
  </li>
);

const Channels = ({
  teamName, userName, channels, users,
}) => (
  <ChannelWrapper className="channels box">
    <div>
      {teamName}
      {userName}
    </div>
    <div>
      <ul>
        <li>Channels</li>
        {channels.map(channel)}
      </ul>
    </div>
    <div>
      <ul>
        <li>Direct Messages</li>
        {users.map(user)}
      </ul>
    </div>
  </ChannelWrapper>
);

export default Channels;
