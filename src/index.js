import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloLink, from } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    headers: {
      ...headers,
      'x-token': token ? `${token}` : '',
      'x-refresh-token': refreshToken ? `${refreshToken}` : '',
    },
  };
});

// const addDatesLink = new ApolloLink((operation, forward) => {
//   return forward(operation).map((response) => {
//     const token = response.headers.get('x-token');
//     const refreshToken = response.headers.get('x-refresh-token');
//     if (token) {
//       localStorage.setItem('token', token);
//     }
//     if (refreshToken) {
//       localStorage.setItem('refreshToken', refreshToken);
//     }
//     return response;
//   });
// });

const client = new ApolloClient({
  link: from([
    authLink.concat(httpLink),
    // addDatesLink.concat(httpLink),
  ]),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <Routes />
    </div>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
