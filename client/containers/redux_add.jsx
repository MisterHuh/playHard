// import React, { Component } from 'react';
import React from 'react';
import SummaryBox from '../components/redux_summaryBox';
import SideBox from '../components/redux_sideBox';
import Form from '../components/redux_form';

// class Add extends Component {}

const Add = () => (
    <React.Fragment>
        <Form />,
        <SummaryBox />,
        <SideBox />
    </React.Fragment>
)

export default Add;
