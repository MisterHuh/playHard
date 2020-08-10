import React from 'react';
import { Form, Field } from 'react-final-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const showResults = async values => {
  await sleep(500) // simulate server latency
  window.alert(JSON.stringify(values, undefined, 2))
};

const ReactFinalForm = () => (
  <div>
    <h1>React Final Form</h1>

    <Form onSubmit={showResults}>
      {({ handleSubmit, submitting, values }) => <form onSubmit={handleSubmit}>

        <div>
          <label>First Name</label>
          <Field
            name='firstName'
            component='input'
            placeholder='Fist Name'
            validate={value => value ? undefined : 'Required'}
          />
        </div>

        <div>
          <label>Last Name</label>
          <Field
            name='lastName'
            component='input'
            placeholder='Last Name'
          />
        </div>

        <div>
          <label>Email</label>
          <Field
            name='email'
            component='input'
            placeholder='email'
          />
        </div>
        <button type='submit' disabled={submitting}>Submit</button>
        <pre>{JSON.stringify(values, undefined, 2)}</pre>
      </form>}
    </Form>

  </div>
)

export default ReactFinalForm;
