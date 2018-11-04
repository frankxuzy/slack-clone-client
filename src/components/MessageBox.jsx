import React from 'react';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';

import { messagesQuery, newChannelMessageSub } from '../query/query';
import Messages from './Messages';

class MessageBox extends React.Component {
  componentWillMount() {
    const { data: { subscribeToMore }, channelId } = this.props;
    subscribeToMore({
      document: newChannelMessageSub,
      variables: { channel_id: channelId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        console.log(subscriptionData);
        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage],
        };
      },
    });
  }

  render() {
    const { data: { loading, messages } } = this.props;
    return (
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
      ));
  }
}

export default graphql(messagesQuery, {
  options: ({ channelId }) => ({
    variables: {
      channel_id: channelId,
    },
  }),
})(MessageBox);
