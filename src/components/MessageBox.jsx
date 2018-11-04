import React from 'react';
import { graphql } from 'react-apollo';
import { messagesQuery } from '../query/query';

import Messages from './Messages';

const MessageBox = ({ data: { loading, messages } }) => (
  loading ? null : <Messages>{JSON.stringify(messages)}</Messages>
);

export default graphql(messagesQuery, {
  options: ({ channelId }) => ({
    variables: {
      channel_id: channelId,
    },
  }),
})(MessageBox);
