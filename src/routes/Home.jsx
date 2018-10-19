import React from 'react';
import { graphql } from 'react-apollo';
import { allUsersQuery } from '../query/query';

const Home = ({ data: { loading, allUsers } }) => (
  <div>
    {loading ? <h1>Loading</h1> : allUsers.map(user => <h1 key={user.id}>{user.email}</h1>)}
  </div>
);


export default graphql(allUsersQuery)(Home);
