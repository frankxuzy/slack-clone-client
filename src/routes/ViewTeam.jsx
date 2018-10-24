import React from 'react';

// import AppLayout from '../components/AppLayout';
import Channels from '../components/Channels';
import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
// import Messages from '../components/Messages';
import Teams from '../components/Teams';
// import Box from '../components/Box';

export default () => (
  <div className="app-layout">
    <Teams teams={[{ id: 1, letter: 'F' }, { id: 2, letter: 'S' }]} />
    <Channels
      teamName="Team name"
      channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Probio' }]}
    />
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
