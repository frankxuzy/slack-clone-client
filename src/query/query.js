import {gql} from 'apollo-boost';

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
  register(username: $username, email: $email, password: $password)
}
`
