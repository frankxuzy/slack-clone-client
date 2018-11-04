import React from 'react';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

import { messagesQuery } from '../query/query';
import Messages from './Messages';

const MessageBox = ({ data: { loading, messages } }) => (
  loading ? null : (
    <Messages>
      <Comment.Group>
        {messages.map(msg => (
          <Comment key={`message-${msg.id}`}>
            <Comment.Content>
              <Comment.Author as="a">{msg.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>{moment(msg.created_at, 'x').format('DD MMM YYYY hh:mm a')}</div>
              </Comment.Metadata>
              <Comment.Text>{msg.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </Messages>
  )
);

export default graphql(messagesQuery, {
  options: ({ channelId }) => ({
    variables: {
      channel_id: channelId,
    },
  }),
})(MessageBox);
