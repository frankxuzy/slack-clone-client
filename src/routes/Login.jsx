import React from 'react'
import {extendObservable} from 'mobx'
import {observer} from 'mobx-react'
import { Container, Header, Form } from 'semantic-ui-react';

export default observer(class Login extends React.Component {
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

  handleSubmit = () => {
    const {email, password} = this
    console.log(email, password)
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
})