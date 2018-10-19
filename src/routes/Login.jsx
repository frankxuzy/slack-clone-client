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
      emailError: '',
      passwordError: '',
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  }

  handleSubmit = async () => {
    this.emailError = '';
    this.passwordError = '';
    const { email, password } = this;
    const { mutate, history } = this.props;
    const loginResponse = await mutate({
      variables: { email, password },
    });
    const {
      errors, ok, token, refreshToken,
    } = loginResponse.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      history.push('/');
    } else {
      errors.forEach(({ path, message }) => {
        this[`${path}Error`] = message;
      });
      console.log(this);
    }
  }

  render() {
    const {
      email, password, emailError, passwordError,
    } = this;
    const errorList = [];
    if (emailError) {
      errorList.push(emailError);
    }
    if (passwordError) {
      errorList.push(passwordError);
    }
    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            error={!!emailError}
            placeholder="Email"
            label="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            error={!!passwordError}
            placeholder="Password"
            label="Password"
            name="password"
            value={password}
            type="password"
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" />
        </Form>
        {(errorList.length)
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
