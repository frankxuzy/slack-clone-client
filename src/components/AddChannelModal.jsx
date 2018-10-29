import React from 'react';
import { withFormik } from 'formik';
import {
  Modal, Input, Form, Button,
} from 'semantic-ui-react';

const AddChannelModal = ({
  open,
  onClose,
  values,
  touched,
  errors,
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
            <Button disabled={isSubmitting} onClick={handleSubmit}>Create Channel</Button>
            <Button disabled={isSubmitting} onClick={onClose}>Cancel</Button>
          </Button.Group>

        </Form.Field>
      </Form>
    </Modal.Content>
  </Modal>
);
export default withFormik({
  mapPropsToValues: () => ({ name: '' }),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
    console.log('submitting...');
    // prevent button been click more than once
    setSubmitting(false);
  },

  displayName: 'BasicForm',
})(AddChannelModal);
