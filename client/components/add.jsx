import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Moment from 'react-moment';
import 'moment-timezone';

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      category: "spendings",
      subCategory: "food"
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

    console.log("raw_date is: ", this.state.date)

    return (
      <div>
        <div className="mx-4">
          <div className="mt-5">
            <DatePicker
              selected={this.state.date}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="mx-4">
          <input className="w-100 mt-5 border" placeholder="  category" type="text" />
        </div>

        <div className="mx-4">
          <input className="w-100 mt-5 border" placeholder="  subCategory" type="text" />
        </div>
      </div>
      );
    }
  }
