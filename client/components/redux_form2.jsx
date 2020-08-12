import React from 'react';
import { Form, Field } from 'react-final-form';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
            <Field
              name="date"
              component={DatePicker}
              placeholder="Date"
              onChange={(event) => {
                console.log("changing date to", event.target.value);
                change("date", event.target.value);
              }}
            />
            {/* <DatePicker value={values} /> */}
          </div>

          <div>
            <label>Category</label>
            <Field name="category" component="input" placeholder="Category" />
          </div>

          <button type="submit">Submit</button>

          <pre>{JSON.stringify(values, undefined, 2)}</pre>
        </form>
      )}
    </Form>
  </div>
);

export default Form2;
