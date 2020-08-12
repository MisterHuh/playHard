import React from 'react';
import { Form, Field } from 'react-final-form';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const showResults = async (values) => {
  await sleep(500); // simulate server latency
  window.alert(JSON.stringify(values, undefined, 2));
};

const Form2 = () => (
  <div>
    <h1>React Final Form</h1>
    <Form onSubmit={showResults}>
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date</label>
            <Field name="date" component="input" placeholder="Date" />
          </div>

          <button type="submit">Submit</button>
          <pre>{JSON.stringify(values, undefined, 2)}</pre>
        </form>
      )}
    </Form>
  </div>
);

export default Form2;
