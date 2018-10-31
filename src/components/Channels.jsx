import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const ChannelWrapper = styled.div`
    color: #958993;
    text-align: left;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = 'padding-left: 10px';

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const Green = styled.span`color: #38978d;`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : '○');

const channel = ({ id, name }, teamId) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem>
    #
      {' '}
      {name}
    </SideBarListItem>
  </Link>
);

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble />
    {' '}
    #
    {name}
  </SideBarListItem>
);

const Channels = ({
  teamName, userName, channels, users, onAddChannelClick, teamId, onInvitePeopleClick, showInvite,
}) => (
  <ChannelWrapper className="channels box">
    <div>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {userName}
    </div>
    <div>
      <SideBarList>
        <li>
          Channels
          {showInvite && (<Icon name="add circle" onClick={onAddChannelClick} />)}
        </li>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <li>Direct Messages</li>
        {users.map(user)}
      </SideBarList>
    </div>
    {showInvite && (
    <div>
      <a href="#invite-people" onClick={onInvitePeopleClick}>
        + Invite People
      </a>
    </div>
    )}
  </ChannelWrapper>
);

export default Channels;
