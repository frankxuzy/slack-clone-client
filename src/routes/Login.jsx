import React from 'react'
import {graphql} from 'react-apollo';
import {extendObservable} from 'mobx'
import {observer} from 'mobx-react'
import { Container, Header, Form } from 'semantic-ui-react';

import {userLogin} from '../query/query'
class Login extends React.Component {
  constructor(props){
    super(props)

    extendObservable(this, {
      email: '',
      password: '',
    })
  }

  handleChange = e => {
    const {name, value} = e.target
    this[name] = value
  }

  handleSubmit = async () => {
    const {email, password} = this
    console.log(email, password, this.props)
    const loginResponse = await this.props.mutate({
      variables: {email, password}
    })
    console.log(loginResponse)
  }

  render() {
    const {email,  password} = this
    return (
    <Container text>
      <Header as='h2'>Login</Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          placeholder='Email'
          label='Email'
          name='email'
          value={email}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder='Password'
          label='Password'
          name='password'
          value={password}
          type='password'
          onChange={this.handleChange}
        />
        <Form.Button content='Submit' />
      </Form>
    </Container>
    ) 
  }
}

export default graphql(userLogin)(observer(Login))