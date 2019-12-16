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
      subCategory: "Food",
      cc: "AmEx",
      amount: "",
      description: "",
      notes: ""
    };
    this.dateHandleChange = this.dateHandleChange.bind(this);
    this.categoryHandleChange = this.categoryHandleChange.bind(this);
    this.subCategoryHandleChange = this.subCategoryHandleChange.bind(this);
    this.ccHandleChange = this.ccHandleChange.bind(this);
    this.inputHandleChange = this.inputHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  dateHandleChange(date) {

    // let current_datetime = date;
    // let formatted_date = (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + "-" + current_datetime.getFullYear()
    // console.log("formatted_date is: ", formatted_date)

    // this.setState({ date: formatted_date });
    this.setState({ date });
  };

  categoryHandleChange(e) {
    console.log("event is: ", e);
    console.log("event.value is: ", e.value);
    this.setState({ category: e.value })
  }

  subCategoryHandleChange(e) {
    console.log("event is: ", e);
    console.log("event.value is: ", e.value);
    this.setState({ subCategory: e.value})
  }

  ccHandleChange(e) {
    console.log("event is: ", e);
    console.log("event.value is: ", e.value);
    this.setState({ cc: e.value })
  }

  inputHandleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log("e.target.name is: ", e.target.name);
    // console.log("e.target.value is: ", e.target.value);
    switch(name) {
      case "amount":
        this.setState({ amount: e.target.value});
        break;
      case "description":
        this.setState({ description: e.target.value });
        break;
      case "notes":
        this.setState({ notes: e.target.value });
        break;
    }
  }

  handleSubmit() {
    console.log("handleSubmit clicked");
  }

  render() {
    console.log("this.state is: ", this.state);

    const dropdownOptions = [
      [
        { value: 'Spendings', label: 'Spendings' },
        { value: 'Fixed', label: 'Fixed' },
        { value: 'Credit', label: 'Credit' },
        { value: 'PayDay', label: 'PayDay' },
        { value: 'Vacation', label: 'Vacation' },
        { value: 'Wedding', label: 'Wedding' }
      ],
      [
        { value: 'Food', label: 'Food' },
        { value: 'Drinks', label: 'Drinks' },
        { value: 'Groceries', label: 'Groceries' },
        { value: 'Gas', label: 'Gas' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Gifts', label: 'Gifts' },
        { value: 'Home', label: 'Home' },
        { value: 'Dogs', label: 'Dogs' },
        { value: 'Party', label: 'Party' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Emergency', label: 'Emergency' },
        { value: 'Utility', label: 'Utility' },
        { value: 'Health', label: 'Health' },
        { value: 'Automobile', label: 'Automobile' }
      ],
      [
        { value: 'AmEx', label: 'AmEx' },
        { value: 'Freedom', label: 'Freedom' },
        { value: 'Sapphire', label: 'Sapphire' },
        { value: 'Venmo', label: 'Venmo' },
        { value: 'BankAmericard', label: 'BankAmericard' }
      ],
    ]

    return (
      <form>
        <div className="mx-4">
            <DatePicker
              selected = {this.state.date}
              onChange={this.dateHandleChange}
              className = "amount mt-4"
            />
        </div>

        <div className="mx-4">
          <Dropdown
            onChange={this.categoryHandleChange}
            options={dropdownOptions[0]}
            arrowClosed = {<span className="arrow-closed" />}
            arrowOpen = {<span className="arrow-open" />}
            placeholder = {this.state.category}
            className = "mt-4"
          />
        </div>

        <div className="mx-4">
          <Dropdown
            onChange={this.subCategoryHandleChange}
            options={dropdownOptions[1]}
            arrowClosed={<span className="arrow-closed" />}
            arrowOpen={<span className="arrow-open" />}
            placeholder={this.state.subCategory}
            className="mt-4"
          />
        </div>

        <div className="mx-4">
          <Dropdown
            onChange={this.ccHandleChange}
            options={dropdownOptions[2]}
            arrowClosed={<span className="arrow-closed" />}
            arrowOpen={<span className="arrow-open" />}
            placeholder={this.state.cc}
            className="mt-4"
          />
        </div>

        <div className="mx-4">
          <input
            onChange={this.inputHandleChange}
            placeholder="$ 00.00"
            name="amount"
            className="amount mt-4"
          />
        </div>

        <div className="mx-4">
          <input
            onChange={this.inputHandleChange}
            placeholder="Descriptions"
            name="descriptions"
            className="amount mt-4"
          />
        </div>

        <div className="mx-4">
          <input
            onChange={this.inputHandleChange}
            placeholder="Notes"
            name="notes"
            className="amount mt-4"
          />
        </div>

        <div className="mx-4">
          <div
            onClick={() => this.handleSubmit()}
            className="amount mt-4"> Add
          </div>
        </div>

      </form>
      );
    }
  }
