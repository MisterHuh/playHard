import React from 'react';
import { reduxForm, Field } from 'redux-form';

/* errorMessage prop doesn't exist in regular ,input. */
/* the youtube tutorial had import Input from './Input', which has built-in errorMessage props*/
// const renderInput = ({input, meta}) => (
//   <input {...input} type='text' errorMessage={meta.error} />
// )

const renderInput = (props) => (
  <input {...props.input} type='text' />
)

const onSubmit = values => {
  alert(JSON.stringify(values));
}

const required = v => {
  if (!v || v === '') {
    return 'This field is required';
  }

  return undefined;
}

const ReduxForm = ({handleSubmit, valid}) => (
  <div>
    <h2>Redux-Form</h2>
    <form onSubmit={handleSubmit}>
      <Field name='customer-id' component={renderInput} validate={required}/>
      <button disabled={!valid} type='submit'>Submit</button>
    </form>
  </div>
)

export default reduxForm({
  form: 'add_entry',
  onSubmit
})(ReduxForm)
