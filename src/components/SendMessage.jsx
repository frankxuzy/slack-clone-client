import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';
import { withFormik } from 'formik';
import { createMessageMutation } from '../query/query';

const InputWrapper = styled.div`
`;

const ENTER_KEY = 13;
const SendMessage = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  channelName,
}) => (
  <InputWrapper className="input box">
    <Input
      fluid
      onKeyDown={(e) => {
        if (e.keyCode === ENTER_KEY && !isSubmitting) {
          handleSubmit(e);
        }
      }}
      name="message"
      value={values.message}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={`Message #${channelName}`}
    />
  </InputWrapper>
);

export default (compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (values, { props: { channelId, mutate }, setSubmitting, resetForm }) => {
      if (!values.message.trim()) {
        setSubmitting(false);
        return;
      }
      await mutate({
        variables: { channel_id: channelId, text: values.message },
      });
      // prevent button been click more than once
      resetForm();
      setSubmitting(false);
    },
  }),
))(SendMessage);
