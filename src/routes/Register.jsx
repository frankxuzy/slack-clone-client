import React from 'react';
import { graphql } from 'react-apollo';
import {
  Container, Header, Form, Message,
} from 'semantic-ui-react';
import { userRegister } from '../query/query';


class Register extends React.Component {
  state = {
    username: '', email: '', password: '', usernameError: '', emailError: '', passwordError: '',
  }

  handleChange = e => this.setState({
    [e.target.name]: e.target.value,
  })

  handleSubmit = async () => {
    this.setState({ usernameError: '', emailError: '', passwordError: '' });
    const { username, email, password } = this.state;
    const { mutate, history } = this.props;
    // the return obj of mutation from server side {data: {register: ...}}
    const response = await mutate({
      variables: { username, email, password },
    });
    const { ok, errors } = response.data.register;
    if (ok) {
      history.push('/');
    } else {
      errors.forEach((error) => {
        this.setState({ [`${error.path}Error`]: error.message });
      });
    }
  }

  render() {
    const {
      username, email, password, usernameError, emailError, passwordError,
    } = this.state;
    const errorList = [usernameError, emailError, passwordError];
    const returnList = errorList.filter(errorMsg => errorMsg.length > 0);

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
          // red the box if have error message
            error={!!usernameError}
            label="User Name"
            placeholder="Username"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <Form.Input
            error={!!emailError}
            label="Email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            error={!!passwordError}
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" />
        </Form>
        {(usernameError || emailError || passwordError)
          ? (
            <Message
              error
              header="There was some errors with your submission"
              list={returnList}
            />
          ) : null}
      </Container>
    );
  }
}

export default graphql(userRegister)(Register);
