import React from 'react';

import AppLayout from '../components/AppLayout';
import Channels from '../components/Channels';
import Header from '../components/Header';
import Input from '../components/Input';
import Messages from '../components/Messages';
import Teams from '../components/Teams';
import Box from '../components/Box';

export default () => (
  <AppLayout>
    <Teams className={Box}>Teams</Teams>
    <Channels>Channels</Channels>
    <Header>Header</Header>
    <Messages>
      <ul className="message-list">
        <li>1</li>
        <li>2</li>
      </ul>
    </Messages>
    <Input>
      <input type="text" placeholder="CSS Grid Layout Module" />
    </Input>
  </AppLayout>
);
