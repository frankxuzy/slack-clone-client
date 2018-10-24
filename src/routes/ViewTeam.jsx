import React from 'react';

// import AppLayout from '../components/AppLayout';
import Channels from '../components/Channels';
// import Header from '../components/Header';
// import Input from '../components/Input';
// import Messages from '../components/Messages';
// import Teams from '../components/Teams';
// import Box from '../components/Box';

export default () => (
  <div className="app-layout">
    <div className="teams box">Teams</div>
    <Channels
      teamName="Team name"
      channels={[{ id: 1, name: 'general' }, { id: 2, name: 'random' }]}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'Probio' }]}
    />
    <div className="header box">Header</div>
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
    <div className="input box">
      <input type="text" placeholder="Have you tried the CSS Grid Layout Module?" />
    </div>
  </div>
);
