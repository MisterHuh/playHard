import React from "react";
// import "react-dates/initialize";
import DatePicker from "react-datepicker";
// import { DateRangePicker } from "react-dates";
import "react-datepicker/dist/react-datepicker.css";

import Calendar from "react-calendar"

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      date: new Date()
    });
  };

  render() {
    return (
      <div>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
