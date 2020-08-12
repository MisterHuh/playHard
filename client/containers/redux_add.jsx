// import React, { Component } from 'react';
import React from 'react';
import SummaryBox from '../components/redux_summaryBox';
import SideBox from '../components/redux_sideBox';


/* forms */
import Form from '../components/redux_form';
import Form2 from '../components/redux_form2';
import ReactFinalForm from '../components/redux_reactFinalForm'
import ReduxForm from '../components/redux_reduxForm';

// class Add extends Component {}

const Add = () => (
    <React.Fragment>

        {/* regular form with state */}
        {/* <Form />, */}

        <Form2 />
        {/* <SummaryBox />, */}
        {/* <SideBox /> */}

        {/* practice react-final-form */}
        {/* <ReactFinalForm /> */}

        {/* practice redux-form */}
        {/* <ReduxForm /> */}
    </React.Fragment>
)

export default Add;
