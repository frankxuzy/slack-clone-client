import React from 'react';
import {graphql} from 'react-apollo';
import {userRegister} from '../query/query';
import { Form } from 'semantic-ui-react';


class Register extends React.Component {
  state = {username: '', email: '', password: '', usernameError: '', emailError: '', passwordError: ''}

  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  handleSubmit = async () => {
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
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Username' 
              name='username' 
              value={username} 
              onChange={this.handleChange} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              placeholder='Email'
              name='email'
              value={email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              placeholder='Password'
              name='password'
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button content='Submit' />
        </Form>
      </div>
    )
  }
}

export default graphql(userRegister)(Register)
