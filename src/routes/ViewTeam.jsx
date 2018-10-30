import React from 'react';
import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';

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

  const teamIndex = teamId ? findIndex(allTeams, ['id', parseInt(teamId, 10)]) : 0;
  const currentTeam = allTeams[teamIndex];
  const channelIndex = channelId ? findIndex(currentTeam.channels, ['id', parseInt(channelId, 10)]) : 0;
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
      <Header channelName={currentChannel.name} />
      <MessageBox channelId={currentChannel.id} />
      <SendMessage channelName={currentChannel.name} />
    </div>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
