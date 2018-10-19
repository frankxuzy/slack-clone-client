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
