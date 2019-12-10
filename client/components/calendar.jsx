import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({ date  });
  };

  render() {
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
