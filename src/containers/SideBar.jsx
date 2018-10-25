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
  const teamIndex = R.findIndex(R.propEq('id', currentTeamId))(allTeams);
  const team = allTeams[teamIndex];

  return [
    <Teams teams={allTeams.map(t => ({
      id: t.id,
      letter: t.name.charAt(0).toUpperCase(),
    }))}
    />,
    <Channels
      teamName={team.name}
      userName={user.username}
      channels={team.channels}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Probio' }]}
    />,
  ];
};

export default graphql(allTeamsQuery)(SideBar);
