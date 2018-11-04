import { gql } from 'apollo-boost';

export const allUsersQuery = gql`
{
  allUsers {
    id
    email
  }
}
`;

export const userRegister = gql`
mutation($username: String!, $email: String!, $password: String!){
  register(username: $username, email: $email, password: $password){
    ok,
    errors{
      path
      message
    }
  }
}
`;

export const userLogin = gql`
mutation ($email: String!, $password: String!){
  login(email: $email, password: $password){
    ok
    token
    refreshToken
    errors{
      path
      message
    }
  }
}
`;

export const createTeamMutation = gql`
mutation ($name: String!){
  createTeam(name: $name){
    ok
    team {
      id
    }
    errors{
      path
      message
    }
  }
}
`;

export const allTeamsQuery = gql`
{
  allTeams{
    id
    name
    owner
    channels {
      id
      name
    }
  }
  inviteTeams{
    id
    name
    owner
    channels {
      id
      name
    }
  }
}
`;

export const createChannelMutation = gql`
  mutation ($team_id: Int!, $name: String!){
    createChannel(team_id: $team_id, name: $name) {
      ok
      channel {
        id
        name
      }
    }
}
`;

export const addTeamMemberMutation = gql`
mutation($email: String!, $teamId: Int!) {
  addTeamMember(email: $email, teamId: $teamId){
    ok
    errors {
      path
      message
    }
  }
}
`;

export const createMessageMutation = gql`
mutation($text: String!, $channel_id: Int!) {
  createMessage(text: $text, channel_id: $channel_id)
}
`;

export const messagesQuery = gql`
query($channel_id: Int!){
  messages(channel_id: $channel_id) {
    id
    text
    created_at
    user{
      username
    }
  }
}
`;

export const newChannelMessageSub = gql`
subscription ($channel_id: Int!) {
  newChannelMessage(channel_id: $channel_id) {
    id
    text
    user {
      username
    }
    created_at
  }
}
`;
