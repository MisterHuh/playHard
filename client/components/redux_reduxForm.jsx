import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

const renderInput = (props) => (
  <input {...props.input} type='text' />
)

const ReduxForm = () => (
  <div>
    <h2>Redux Form</h2>
    <form action="">
      <Field
        name='customer-id'
        component={renderInput}
      />

      <button type='submit'>Submit</button>
    </form>
  </div>
)

export default reduxForm({
  form: 'my-customer-registration-form'
})(ReduxForm)
