import React from 'react';
import { graphql } from 'react-apollo';
import * as R from 'ramda';

import { allTeamsQuery } from '../query/query';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import { decodeToken } from '../utils';
import AddChannelModal from '../components/AddChannelModal';

class SideBar extends React.Component {
  state = {
    isAddChannelOn: false,
  }

  handleAddChannelClick = () => {
    this.setState({ isAddChannelOn: true });
  }

  handleCloseChannelModal = () => {
    this.setState({ isAddChannelOn: false });
  }

  render() {
    const { data: { loading, allTeams }, currentTeamId } = this.props;

    if (loading) {
      return null;
    }
    const { user } = decodeToken();
    const teamIndex = currentTeamId ? R.findIndex(R.propEq('id', parseInt(currentTeamId, 10)))(allTeams) : 0;
    const team = allTeams[teamIndex];
    const { isAddChannelOn } = this.state;
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
        onAddChannelClick={this.handleAddChannelClick}
        teamName={team.name}
        userName={user.username}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Probio' }]}
      />,
      <AddChannelModal
        teamId={team.id}
        onClose={this.handleCloseChannelModal}
        key="sidebar-add-channel-modal"
        open={isAddChannelOn}
      />,
    ];
  }
}

export default graphql(allTeamsQuery)(SideBar);
