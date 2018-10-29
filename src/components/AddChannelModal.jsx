import React from 'react';
import { withFormik } from 'formik';
import {
  Modal, Input, Form, Button,
} from 'semantic-ui-react';
import { compose, graphql } from 'react-apollo';

import findIndex from 'lodash/findIndex';
import { createChannelMutation, allTeamsQuery } from '../query/query';

const AddChannelModal = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            name="name"
            placeholder="Channel Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        <Form.Field>
          <Button.Group attached="bottom">
            <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>Create Channel</Button>
            <Button disabled={isSubmitting} onClick={onClose}>Cancel</Button>
          </Button.Group>

        </Form.Field>
      </Form>
    </Modal.Content>
  </Modal>
);
export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: () => ({ name: '' }),

    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      await mutate({
        variables: { team_id: teamId, name: values.name },
        update: (proxy, { data: { createChannel } }) => {
          const { ok, channel } = createChannel;
          if (!ok) {
            return;
          }
          const data = proxy.readQuery({ query: allTeamsQuery });
          const currentIdx = findIndex(data.allTeams, ['id', teamId]);
          data.allTeams[currentIdx].channels.push(channel);
          proxy.writeQuery({ query: allTeamsQuery, data });
        },
      });
      // prevent button been click more than once
      setSubmitting(false);
      onClose();
    },
    displayName: 'BasicForm',
  }),
)(AddChannelModal);
