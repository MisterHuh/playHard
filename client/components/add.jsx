import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Moment from 'react-moment';
import 'moment-timezone';

import Dropdown from "react-dropdown";
// import Select from "react-select";

import DropdownInput from "react-dropdown-input";

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

    // const options = [
    //   'Spendings', 'Fixed', 'Credit'
    // ]

    const options = [
      { value: 'spendings', label: 'Spendings' },
      { value: 'fixed', label: 'Fixed' },
      { value: 'credit', label: 'Credit' },
    ]

    var searchNames = ['Sydney', 'Melbourne', 'Brisbane',
      'Adelaide', 'Perth', 'Hobart'];

    return (
      <div>
        <div className="mx-4">
          {/* <div className="mt-5"> */}
            <DatePicker
              selected={this.state.date}
              onChange={this.handleChange}
              className="mt-5"
            />
          {/* </div> */}
        </div>

        <div className="mx-4">
          {/* <input className="w-100 mt-5 border" placeholder="  category" type="text" /> */}

          {/* <Dropdown
            options={options}
            arrowClosed={<span className="arrow-closed" />}
            arrowOpen={<span className="arrow-open" />}
            placeholder="Select an option"
            className="mt-5"
            isSearchable
          /> */}

          <DropdownInput
            options={searchNames}
            defaultValue={this.props.initialValue}
            menuClassName='dropdown-input'
            onSelect={this.handleSelectName}
            placeholder='Search...'
          />

        </div>

        <div className="mx-4">
          <input className="w-100 mt-5 border" placeholder="  subCategory" type="text" />
        </div>
      </div>
      );
    }
  }
