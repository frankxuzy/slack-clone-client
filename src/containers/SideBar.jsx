import React from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import { decodeToken } from '../utils';
import AddChannelModel from '../components/AddChannelModel';
import InvitePeopleModel from '../components/InvitePeopleModel';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddChannelOn: false,
      isInvitePeopleOn: false,
    };
    this.toggleAddChannelClick = this.toggleAddChannelClick.bind(this);
    this.toggleInvitePeopleClick = this.toggleInvitePeopleClick.bind(this);
  }


  toggleAddChannelClick = (e) => {
    const { isAddChannelOn } = this.state;
    if (e) {
      e.preventDefault();
    }
    this.setState({ isAddChannelOn: !isAddChannelOn });
  }

  toggleInvitePeopleClick = (e) => {
    const { isInvitePeopleOn } = this.state;
    if (e) {
      e.preventDefault();
    }
    this.setState({ isInvitePeopleOn: !isInvitePeopleOn });
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
        onAddChannelClick={this.toggleAddChannelClick}
        onInvitePeopleClick={this.toggleInvitePeopleClick}
        teamName={team.name}
        teamId={team.id}
        userName={user.username}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Probio' }]}
      />,
      <AddChannelModel
        teamId={team.id}
        onClose={this.toggleAddChannelClick}
        key="sidebar-add-channel-model"
        open={isAddChannelOn}
      />,
      <InvitePeopleModel
        teamId={team.id}
        onClose={this.toggleInvitePeopleClick}
        key="sidebar-invite-people-model"
        open={isInvitePeopleOn}
      />,
    ];
  }
}

export default SideBar;
