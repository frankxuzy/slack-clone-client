import React from 'react';
import {graphql} from 'react-apollo';
import {userRegister} from '../query/query';
import { Container, Header, Form, Message } from 'semantic-ui-react';


class Register extends React.Component {
  state = {username: '', email: '', password: '', usernameError: '', emailError: '', passwordError: ''}

  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  handleSubmit = async () => {
    this.setState({usernameError: '', emailError: '', passwordError: ''})
    const {username, email, password} = this.state
    // the return obj of mutation from server side {data: {register: ...}}
    const response = await this.props.mutate({
      variables: {username, email, password}
    })
    const {ok, errors} = response.data.register
    if(ok) {
      this.props.history.push('/')
    } else {
      errors.forEach(error => {
        this.setState({[`${error.path}Error`]: error.message})
      });
    }
  }
  render () {
    const { username, email, password, usernameError, emailError, passwordError} = this.state
    const errorList = [usernameError, emailError, passwordError]
    const returnList = errorList.filter(errorMsg => {
      return errorMsg.length > 0
    })

    return (
      <Container>
        <Header as='h2'>Register</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
            // red the box if have error message
              error={!!usernameError}
              placeholder='Username' 
              name='username' 
              value={username} 
              onChange={this.handleChange} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              error={!!emailError}
              placeholder='Email'
              name='email'
              value={email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              error={!!passwordError}
              placeholder='Password'
              name='password'
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button content='Submit' />
        </Form>
        {(usernameError || emailError || passwordError) ? 
        <Message
          error
          header='There was some errors with your submission'
          list={returnList}
        /> : null}
      </Container>
    )
  }
}

export default graphql(userRegister)(Register)
