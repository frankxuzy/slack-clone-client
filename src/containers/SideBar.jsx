import React from 'react';
import { graphql } from 'react-apollo';
import * as R from 'ramda';

import { allTeamsQuery } from '../query/query';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import { decodeToken } from '../utils';

const SideBar = ({ data: { loading, allTeams }, currentTeamId }) => {
  if (loading) {
    return null;
  }
  const { user } = decodeToken();
  const teamIndex = currentTeamId ? R.findIndex(R.propEq('id', parseInt(currentTeamId, 10)))(allTeams) : 0;
  const team = allTeams[teamIndex];

  return [
    <Teams
      key="teamskey"
      teams={allTeams.map(t => ({
        id: t.id,
        letter: t.name.charAt(0).toUpperCase(),
      }))}
    />,
    <Channels
      key="channelskey"
      teamName={team.name}
      userName={user.username}
      channels={team.channels}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Probio' }]}
    />,
  ];
};

export default graphql(allTeamsQuery)(SideBar);
