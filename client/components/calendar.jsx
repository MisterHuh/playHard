import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Moment from 'react-moment';
import 'moment-timezone';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()

    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({ date });

    let current_datetime = date;
    let formatted_date = (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + "-" + current_datetime.getFullYear()
    console.log("formatted_date is: ", formatted_date)

  };

  render() {
    console.log("date is: ", this.state.date)
    return (
      <div>
        <DatePicker
          selected={this.state.date}
          onChange={this.handleChange}
          // placeholderText="  choose a date"
        />
      </div>
    );
  }
}
