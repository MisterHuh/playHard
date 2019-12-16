import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Moment from 'react-moment';
import 'moment-timezone';

import Dropdown from "react-dropdown";
import 'react-dropdown/style.css'
// import Select from "react-select";

// import DropdownInput from "react-dropdown-input";

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      category: "Spendings",
      subCategory: "Food"
    };
    this.handleChange = this.handleChange.bind(this);
    this.categoryHandleChange = this.categoryHandleChange.bind(this);
    this.subcategoryHandleChange = this.subcategoryHandleChange.bind(this);
  }

  handleChange(date) {

    let current_datetime = date;
    let formatted_date = (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + "-" + current_datetime.getFullYear()

    // this.setState({ date: formatted_date });
    this.setState({ date });

    console.log("formatted_date is: ", formatted_date)

  };

  categoryHandleChange(e) {
    console.log("event is: ", e);
    console.log("event.value is: ", e.value);
    this.setState({ category: e.value })

    // const { name, value } = e.target;
    // this.setState({ [name]: value });
  }

  subcategoryHandleChange(e) {
    console.log("event is: ", e);
    console.log("event.value is: ", e.value);
    this.setState({ subCategory: e.value})
  }



  render() {

    console.log("this.state is: ", this.state);
    // console.log("raw_date is: ", this.state.date);

    const dropdownOptions = [
      [
        { value: 'Spendings', label: 'Spendings' },
        { value: 'Fixed', label: 'Fixed' },
        { value: 'Credit', label: 'Credit' },
        { value: 'Vacation', label: 'Vacation' },
        { value: 'Wedding', label: 'Wedding' }
      ],
      [
        { value: 'Food', label: 'Food' },
        { value: 'Drinks', label: 'Drinks' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Dogs', label: 'Dogs' },
        { value: 'Groceries', label: 'Groceries' }
      ],

    ]

    return (
      <div>
        <div className="mx-4">
          {/* <div className="mt-5"> */}
            <DatePicker
              selected = {this.state.date}
              onChange = {this.handleChange}
              className = "mt-5"
            />
          {/* </div> */}
        </div>

        <div className="mx-4">
          {/* <input className="w-100 mt-5 border" placeholder="  category" type="text" /> */}

          <Dropdown
            // selected = {this.state.category}
            onChange={this.categoryHandleChange}
            options={dropdownOptions[0]}
            arrowClosed = {<span className="arrow-closed" />}
            arrowOpen = {<span className="arrow-open" />}
            placeholder = {this.state.category}
            className = "mt-5"
          />

        </div>

        <div className="mx-4">
          {/* <input className="w-100 mt-5 border" placeholder="  subCategory" type="text" /> */}

          <Dropdown
            // selected = {this.state.category}
            onChange={this.subcategoryHandleChange}
            options={dropdownOptions[1]}
            arrowClosed={<span className="arrow-closed" />}
            arrowOpen={<span className="arrow-open" />}
            placeholder={this.state.subCategory}
            className="mt-5"
          />
        </div>
      </div>
      );
    }
  }
