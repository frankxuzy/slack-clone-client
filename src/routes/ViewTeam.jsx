import React from 'react';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import SideBar from '../containers/SideBar';
// import Messages from '../components/Messages';

export default () => (
  <div className="app-layout">
    <SideBar currentTeamId={14} />
    <Header channelName="general" />
    <div className="messages box">
      <ul className="message-list">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    </div>
    <SendMessage channelName="general" />
  </div>
);
