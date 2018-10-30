import React from 'react';
import { graphql } from 'react-apollo';
import findIndex from 'lodash/findIndex';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import SideBar from '../containers/SideBar';
// import Messages from '../components/Messages';
import { allTeamsQuery } from '../query/query';

const ViewTeam = ({ data: { loading, allTeams }, match: { params: { teamId } } }) => {
  if (loading) {
    return null;
  }

  const teamIndex = teamId ? findIndex(allTeams, ['id', parseInt(teamId, 10)]) : 0;
  const currentTeam = allTeams[teamIndex];
  return (
    <div className="app-layout">
      <SideBar
        teams={allTeams.map(t => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
        team={currentTeam}
      />
      <Header channelName="general" />
      <div className="messages box">
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </div>
      <SendMessage channelName="general" />
    </div>
  );
};

export default graphql(allTeamsQuery)(ViewTeam);
