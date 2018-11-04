import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import 'semantic-ui-css/semantic.min.css';
import './index.css';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import client from './apolloClient';

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
