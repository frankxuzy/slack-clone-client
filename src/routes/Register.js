import React from 'react';
import {graphql} from 'react-apollo';
import {userRegister} from '../query/query';
import { Form } from 'semantic-ui-react';


class Register extends React.Component {
  state = {username: '', email: '', password: ''}

  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  handleSubmit = async () => {
    console.log(this.props)
    await this.props.mutate({
      variables: {...this.state}
    })
  }
  render () {
    const { username, email, password} = this.state
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
