import React from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import { decodeToken } from '../utils';
import AddChannelModel from '../components/AddChannelModel';
import InvitePeopleModel from '../components/InvitePeopleModel';

class SideBar extends React.Component {
  state = {
    isAddChannelOn: false,
    isInvitePeopleOn: false,
  }

  handleAddChannelClick = () => {
    this.setState({ isAddChannelOn: true });
  }

  handleInvitePeopleClick = () => {
    this.setState({ isInvitePeopleOn: true });
  }

  handleCloseChannelModel = () => {
    this.setState({ isAddChannelOn: false });
  }

  handleCloseInvitePeople = () => {
    this.setState({ isInvitePeopleOn: false });
  }

  render() {
    const { teams, team } = this.props;
    const { user } = decodeToken();
    const { isAddChannelOn, isInvitePeopleOn } = this.state;
    // need to add default sidebar
    return (teams.length !== 0) && [
      <Teams
        key="teamskey"
        teams={teams}
      />,
      <Channels
        key="channelskey"
        onAddChannelClick={this.handleAddChannelClick}
        onInvitePeopleClick={this.handleInvitePeopleClick}
        teamName={team.name}
        teamId={team.id}
        userName={user.username}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Probio' }]}
      />,
      <AddChannelModel
        teamId={team.id}
        onClose={this.handleCloseChannelModel}
        key="sidebar-add-channel-model"
        open={isAddChannelOn}
      />,
      <InvitePeopleModel
        teamId={team.id}
        onClose={this.handleCloseInvitePeople}
        key="sidebar-invite-people-model"
        open={isInvitePeopleOn}
      />,
    ];
  }
}

export default SideBar;
