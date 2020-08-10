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
      {({ handleSubmit }) => <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <Field
            name='firstName'
            component='input'
            placeholder='Fist Name' />
        </div>
        <button type='submit'>Submit</button>
      </form>}
    </Form>

  </div>
)

export default ReactFinalForm;
