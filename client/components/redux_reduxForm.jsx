import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

const ReduxForm = () => (
  <div>
    <h2>Redux Form</h2>
    <form action="">
      <input name='customer-id' type='text' id='customer-id' />
      <button type='submit'>Submit</button>
    </form>
  </div>
)

export default reduxForm({
  form: 'my-customer-registration-form'
})(ReduxForm)
