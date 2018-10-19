import React from 'react';
import { graphql } from 'react-apollo';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import {
  Container, Header, Form, Message,
} from 'semantic-ui-react';
import _ from 'lodash';

import { userLogin } from '../query/query';

class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      errorList: [],
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  }

  handleSubmit = async () => {
    this.errorList = [];
    const { email, password } = this;
    const { mutate } = this.props;
    const loginResponse = await mutate({
      variables: { email, password },
    });
    const {
      errors, ok, token, refreshToken,
    } = loginResponse.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      this.errorList = _.pick(errors, 'message');
      console.log(errors, this.errorList);
    }
  }

  render() {
    const { email, password, errorList } = this;
    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="Email"
            label="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Password"
            label="Password"
            name="password"
            value={password}
            type="password"
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" />
        </Form>
        {(errorList.length !== 0)
          ? (
            <Message
              error
              header="There was some errors with your submission"
              list={errorList}
            />
          ) : null}
      </Container>
    );
  }
}

export default graphql(userLogin)(observer(Login));
