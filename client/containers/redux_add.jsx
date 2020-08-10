// import React, { Component } from 'react';
import React from 'react';
import SummaryBox from '../components/redux_summaryBox';
import SideBox from '../components/redux_sideBox';
import Form from '../components/redux_form';
import ReduxForm from '../components/redux_reduxForm';

// class Add extends Component {}

const Add = () => (
    <React.Fragment>
        {/* <Form />,
        <SummaryBox />,
        <SideBox /> */}
        <ReduxForm />
    </React.Fragment>
)

export default Add;
