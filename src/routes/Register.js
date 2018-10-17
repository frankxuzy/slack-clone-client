import React from 'react'
import { Form } from 'semantic-ui-react'


class Register extends React.Component {
  state = {username: '', email: '', password: '', submittedName: '', submittedEmail: '', submittedPassowrd: ''}

  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  })

  handleSubmit = () => {
    const {username, email, password} = this.state
    this.setState({
      submittedName: username,
      submittedEmail: email,
      submittedPassowrd: password
    })
  }
  render () {
    const { username, email, password, submittedName, submittedEmail, submittedPassowrd} = this.state
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
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ username, email, password }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedName, submittedEmail, submittedPassowrd }, null, 2)}</pre>
      </div>
      
    )
  }
}

export default Register
