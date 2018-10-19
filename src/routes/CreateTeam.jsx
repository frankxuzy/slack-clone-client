import React from 'react';
import { graphql } from 'react-apollo';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import {
  Container, Header, Form, Message,
} from 'semantic-ui-react';

import { createTeamMutation } from '../query/query';

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      nameError: '',
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  }

  handleSubmit = async () => {
    this.nameError = '';
    const { name } = this;
    const { mutate, history } = this.props;
    const createTeamResponse = await mutate({
      variables: { name },
    });
    const {
      errors, ok,
    } = createTeamResponse.data.createTeam;

    if (ok) {
      history.push('/');
    } else {
      errors.forEach(({ path, message }) => {
        this[`${path}Error`] = message;
      });
    }
  }

  render() {
    const {
      name, nameError,
    } = this;
    const errorList = [];
    if (nameError) {
      errorList.push(nameError);
    }
    return (
      <Container text>
        <Header as="h2">Create Team Name</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            error={!!nameError}
            placeholder="Name"
            label="Name"
            name="name"
            value={name}
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

export default graphql(createTeamMutation)(observer(CreateTeam));
