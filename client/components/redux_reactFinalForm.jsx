import React from "react";
import { Form, Field } from "react-final-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const showResults = async (values) => {
  await sleep(500); // simulate server latency
  window.alert(JSON.stringify(values, undefined, 2));
};

const required = (value) => (value ? undefined : "Required");

const ReactFinalForm = () => (
  <div>
    <h1>React Final Form</h1>

    <Form onSubmit={showResults}>
      {({ handleSubmit, submitting, values }) => (
        <form onSubmit={handleSubmit}>

          <div>
            <Field name="firstName" placeholder="Fist Name" validate={required}>
              {({ input, meta, placeholder }) => (
                <div>
                  <label>First Name</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>

          <div>
            <Field name="lastName" placeholder="Last Name" validate={required}>
              {({ input, meta, placeholder }) => (
                <div>
                  <label>Last Name</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>

          <div>
            <Field name="email" placeholder="email" validate={required} />
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

export default ReactFinalForm;
