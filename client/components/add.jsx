import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from "react-dropdown";
import 'react-dropdown/style.css'

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      category: "Spendings",
      subCategory: "Food",
      cc: "Sapphire",
      amount: "",
      where: "",
      notes: "",
      formErrors: {
        amount: "",
        where: ""
      }
    };
    this.dateHandleChange = this.dateHandleChange.bind(this);
    this.categoryHandleChange = this.categoryHandleChange.bind(this);
    this.subCategoryHandleChange = this.subCategoryHandleChange.bind(this);
    this.ccHandleChange = this.ccHandleChange.bind(this);
    this.inputHandleChange = this.inputHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.formatDate = this.formatDate.bind(this);
    this.addEntry = this.addEntry.bind(this);
  }

  componentDidMount() {

  }

  dateHandleChange(date) {
    this.setState({ date });
  };

  categoryHandleChange(e) {
    // console.log("event is: ", e);
    // console.log("event.value is: ", e.value);
    this.setState({ category: e.value })
  }

  subCategoryHandleChange(e) {
    // console.log("event is: ", e);
    // console.log("event.value is: ", e.value);
    this.setState({ subCategory: e.value})
  }

  ccHandleChange(e) {
    // console.log("event is: ", e);
    // console.log("event.value is: ", e.value);
    this.setState({ cc: e.value })
  }

  inputHandleChange(e) {
    e.preventDefault();

    const formErrors = this.state.formErrors;
    const { name, value } = e.target;

    switch(name) {
      case "amount":
      formErrors.amount = value.length < 1
        ? 'enter amount'
        : "";
        break;
    }
    this.setState({ formErrors, [name]: value });
  }

  handleSubmit() {
    // const formatted_date = this.formatDate();
    this.addEntry()
  }

  // formatDate() {
  //   let current_datetime = this.state.date;
  //   let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
  //   return formatted_date;
  // }

  addEntry() {

    let current_datetime = this.state.date;
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();

    let formatted_amount = parseFloat(this.state.amount);
    console.log("formatted_amount is: ", formatted_amount);
    console.log("formatted_amount type is: ", typeof(formatted_amount));

    const entry = {
      date: formatted_date,
      category: this.state.category,
      subCategory: this.state.subCategory,
      cc: this.state.cc,
      amount: formatted_amount,
      where: this.state.where,
      notes: this.state.notes
    };

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry)
    };

    console.log("final entry is: ", entry);

    fetch(`/api/add.php`, req)
      .then(response => response.json())
      .catch(error => {
        console.error('delete error: ', error);
      });

    this.setState({
      date: new Date(),
      category: "Spendings",
      subCategory: "Food",
      cc: "Sapphire",
      amount: "",
      where: "",
      notes: ""
     })
  }

  render() {
    // console.log("this.state is: ", this.state);

    const dropdownOptions = [
      [
        { value: 'Spendings', label: 'Spendings' },
        { value: 'Fixed', label: 'Fixed' },
        { value: 'Credit', label: 'Credit' },
        { value: 'Payday', label: 'Payday' },
        { value: 'Vacation', label: 'Vacation' },
        { value: 'Wedding', label: 'Wedding' }
      ],
      [
        { value: 'Food', label: 'Food' },
        { value: 'Drinks', label: 'Drinks' },
        { value: 'Groceries', label: 'Groceries' },
        { value: 'Gas', label: 'Gas' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'gifts', label: 'Gifts' },
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
        <div className="addForm">
          <div className="mx-4">
              <DatePicker
                selected = {this.state.date}
                onChange={this.dateHandleChange}
                className = "amount mt-4"
              />
          </div>

          <div className="mx-4 addInput">
            <Dropdown
              onChange={this.categoryHandleChange}
              options={dropdownOptions[0]}
              arrowClosed = {<span className="arrow-closed" />}
              arrowOpen = {<span className="arrow-open" />}
              placeholder = {this.state.category}
              className = "mt-4"
            />
          </div>

          <div className="mx-4 addInput">
            <Dropdown
              onChange={this.subCategoryHandleChange}
              options={dropdownOptions[1]}
              arrowClosed={<span className="arrow-closed" />}
              arrowOpen={<span className="arrow-open" />}
              placeholder={this.state.subCategory}
              className="mt-4"
            />
          </div>

          <div className="mx-4 addInput">
            <Dropdown
              onChange={this.ccHandleChange}
              options={dropdownOptions[2]}
              arrowClosed={<span className="arrow-closed" />}
              arrowOpen={<span className="arrow-open" />}
              placeholder={this.state.cc}
              className="mt-4"
            />
          </div>

          <div className="mx-4 addInput">
            <input
              value={this.state.amount}
              onChange={this.inputHandleChange}
              placeholder="$ 00.00"
              name="amount"
              className="amount mt-4"
              // value="4.50"
            />
          </div>

          <div className="mx-4 addInput">
            <input
              value = {this.state.where}
              onChange={this.inputHandleChange}
              placeholder="Where?"
              name="where"
              className="amount mt-4"
              // value="Starbucks"
            />
          </div>

          <div className="mx-4 addInput">
            <input
              value = {this.state.notes}
              onChange={this.inputHandleChange}
              placeholder="Notes"
              name="notes"
              className="amount mt-4"
              // value="coffee"
            />
          </div>

          <div className="mx-4 addInput">
            <div
              onClick={() => this.handleSubmit()}
              className="addButton mt-4 text-center"> Add
            </div>
          </div>
        </div>

      </form>
      );
    }
  }
