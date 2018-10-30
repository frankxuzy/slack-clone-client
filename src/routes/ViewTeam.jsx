import React from 'react';
import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import SideBar from '../containers/SideBar';
import MessageBox from '../components/MessageBox';
// import Messages from '../components/Messages';
import { allTeamsQuery } from '../query/query';

const ViewTeam = ({ data: { loading, allTeams }, match: { params: { teamId, channelId } } }) => {
  if (loading) {
    return null;
  }

  const teamIdInt = parseInt(teamId, 10);
  const channelIdInt = parseInt(channelId, 10);
  if (!allTeams.length) {
    return (<Redirect to="/create-team" />);
  }
  const teamIndex = teamIdInt ? findIndex(allTeams, ['id', teamIdInt]) : 0;
  const currentTeam = allTeams[teamIndex];
  const channelIndex = channelIdInt ? findIndex(currentTeam.channels, ['id', channelIdInt]) : 0;
  const currentChannel = currentTeam.channels[channelIndex];
  return (
    <div className="app-layout">
      <SideBar
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={currentTeam}
      />
      {currentChannel && <Header channelName={currentChannel.name} /> }
      {currentChannel && <MessageBox channelId={currentChannel.id} /> }
      {currentChannel && <SendMessage channelName={currentChannel.name} /> }
    </div>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
