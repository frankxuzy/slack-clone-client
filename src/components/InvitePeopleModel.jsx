import React from 'react';
import { withFormik } from 'formik';
import {
  Modal, Input, Form, Button,
} from 'semantic-ui-react';
import { compose, graphql } from 'react-apollo';

import { addTeamMemberMutation } from '../query/query';
import { normalizeErrors } from '../utils';

const InvitePeopleModel = ({
  open,
  onClose,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  touched,
  errors,
}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Member to your Team</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input
            name="email"
            placeholder="User's Email"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Field>
        {touched.email && errors.email ? errors.email[0] : null}
        <Form.Field>
          <Button.Group attached="bottom">
            <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>Add User</Button>
            <Button disabled={isSubmitting} onClick={onClose}>Cancel</Button>
          </Button.Group>
        </Form.Field>
      </Form>
    </Modal.Content>
  </Modal>
);
export default compose(
  graphql(addTeamMemberMutation),
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting, setErrors }) => {
      const resp = await mutate({
        variables: { teamId, email: values.email },
      });
      const { ok, errors } = resp.data.addTeamMember;
      if (ok) {
        setSubmitting(false);
        onClose();
      } else {
        setSubmitting(false);
        setErrors(normalizeErrors(errors));
      }
    },
  }),
)(InvitePeopleModel);
