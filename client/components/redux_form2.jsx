import React from 'react';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-focus'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const showResults = async (values) => {
  await sleep(500); // simulate server latency
  window.alert(JSON.stringify(values, undefined, 2));
};

const required = (value) => (value ? undefined : 'Required');
const focusOnError = createDecorator();

const Form2 = () => (
  <div>
    <h1>React Final Form</h1>
    <Form onSubmit={showResults} decorators={[focusOnError]}>
      {({ handleSubmit, values, submitting }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Date</label>
            {/* <Field
              name="date"
              component={DatePicker}
              placeholder="Date"
              onChange={(event) => {
                console.log("changing date to", event.target.value);
                change("date", event.target.value);
              }}
            /> */}
            <DatePicker value={values} />
          </div>

          <div>
            <Field name="category" placeholder="Category" validate={required}>
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? 'active' : ''}>
                  <label>Category</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>

          <button type="submit" disabled={submitting}>
            Submit
          </button>

          <pre>{JSON.stringify(values, undefined, 2)}</pre>
        </form>
      )}
    </Form>
  </div>
);

export default Form2;
