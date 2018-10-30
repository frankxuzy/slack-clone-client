import React from 'react';

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
    const { teams, team } = this.props;
    const { user } = decodeToken();
    const { isAddChannelOn } = this.state;
    // need to add default sidebar
    return (teams.length !== 0) && [
      <Teams
        key="teamskey"
        teams={teams}
      />,
      <Channels
        key="channelskey"
        onAddChannelClick={this.handleAddChannelClick}
        teamName={team.name}
        teamId={team.id}
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

export default SideBar;
