import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import 'semantic-ui-css/semantic.min.css';
import './index.css';


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

const afterwareLink = new ApolloLink((operation, forward) => {
  const { headers } = operation.getContext();
  if (headers) {
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');
    if (token) {
      localStorage.setItem('token', token);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }
  return forward(operation);
});

// concat link, middleware link and afterware link
const link = afterwareLink.concat(authLink.concat(httpLink));

const client = new ApolloClient({
  link,
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
