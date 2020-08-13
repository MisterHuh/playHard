import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import createDecorator from 'final-form-focus'

import { connect } from 'react-redux';
import { POST_DATA } from "../actions/types";
// import { postData } from '../actions/postData';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const submit = postData();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const showResults = async (values) => {
  await sleep(500); // simulate server latency
  window.alert(JSON.stringify(values, undefined, 2));
};

// const test = (values) => {
//   props.postData(values);
//   console.log("onSubmit values is: ", values);
// }

// const postData = (values) => (dispatch) => {

//   const req = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(values)
//     };

//   console.log("action: POST_DATA");
//   fetch("/api/add.php", req)
//     .then((res) => res.json())
//     .then((data) =>
//       dispatch({
//         type: POST_DATA,
//         payload: entry,
//       })
//     );
// };

const postData = (values) => (

  fetch("/api/add.php", {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
  })
    .then((res) => res.json())
    // .then((data) =>
    //   dispatch({
    //     type: POST_DATA,
    //     payload: entry,
    //   })
    // );
)


const onSubmit = (values) => {
  console.log("onSubmit...");
  return;
};


const required = (value) => (value ? undefined : 'Required');
const focusOnError = createDecorator();

const Form2 = () => (
  <div>
    <h1>React Final Form</h1>
    <Form onSubmit={postData} decorators={[focusOnError]}>
      {({ handleSubmit, values, submitting }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field name="date" placeholder="Date" validate={required}>
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? "active" : ""}>
                  <label>Date</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            {/* <DatePicker value={values} /> */}
          </div>

          <div>
            <Field name="category" placeholder="Category" validate={required}>
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? "active" : ""}>
                  <label>Category</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>

          <div>
            <Field
              name="subCategory"
              placeholder="SubCategory"
              validate={required}
            >
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? "active" : ""}>
                  <label>SubCategory</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>

          <div>
            <Field
              name="creditCard"
              placeholder="Credit Card"
              validate={required}
            >
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? "active" : ""}>
                  <label>Credit Card</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>

          <div>
            <Field name="amount" placeholder="Amount" validate={required}>
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? "active" : ""}>
                  <label>Amount</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>

          <div>
            <Field name="desc" placeholder="Description" validate={required}>
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? "active" : ""}>
                  <label>Description</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>

          <div>
            <Field name="notes" placeholder="Notes">
              {({ input, meta, placeholder }) => (
                <div className={meta.active ? "active" : ""}>
                  <label>Notes</label>
                  <input {...input} placeholder={placeholder} />
                  {/* {meta.error && meta.touched && <span>{meta.error}</span>} */}
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

Form2.propTypes = {
  // postData: PropTypes.func.isRequired,
};

// export default Form2;
export default connect (null, { postData })(Form2);
