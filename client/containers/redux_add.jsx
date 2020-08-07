// import React, { Component } from 'react';
import React from 'react';
import SummaryBox from '../components/redux_summaryBox';
import SideBox from '../components/redux_sideBox';

// class Add extends Component {}

const Add = () => (
    <React.Fragment>
        <SummaryBox />,
        <SideBox />
    </React.Fragment>
)

export default Add;
