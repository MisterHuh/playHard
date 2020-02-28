import React from "react";

import { CurrencyFormatter } from "./currencyFormatter";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from "react-dropdown";
import 'react-dropdown/style.css'


export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      current: [],
      currentIndex: 0,

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
    this.addEntry = this.addEntry.bind(this);

    this.retrieveAllData = this.retrieveAllData.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  dateHandleChange(date) {
    this.setState({ date });
  };

  categoryHandleChange(e) {
    // console.log("event is: ", e);
    // console.log("event.value is: ", e.value);
    // console.log("setting sate for Category Dropdown");
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
    this.addEntry()
  }

  addEntry() {

    let current_datetime = this.state.date;
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();

    let formatted_amount = parseFloat(this.state.amount);

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
        // console.error('delete error: ', error);
        // console.log("entry is: ", entry);
        // alert("entry is: ", entry);
      });

    this.setState({
      date: new Date(),
      category: "Spendings",
      subCategory: "Food",
      cc: "Sapphire",
      amount: "",
      where: "",
      notes: "",
      currentIndex: 0
     })

     this.retrieveAllData();
  }

  /* refactor this code into the actual html body? */
  renderSideBox() {
    // console.log("this.state.currentIndex is: ", this.state.currentIndex);
    // console.log("this.state.current is: ", this.state.current);

    let creditsFontColor = this.state.current[this.state.currentIndex]["amount"] < 0 ? "creditsFontColor" : null;
    let fontSizeController = this.state.current[this.state.currentIndex]["notes"].length >= 19 ? "renderSideBoxFont": null;
    let noteFiller = this.state.current[this.state.currentIndex]["notes"] ? this.state.current[this.state.currentIndex]["notes"]  : "-";
    // let fontSizeController = this.state.current[this.state.currentIndex].length > 19 ? "renderSideBoxFont" : null;

    if (this.state.current) {
      // console.log("this.state.current[this.state.currentIndex]['id'] is: ", this.state.current[this.state.currentIndex]['id']);
      return (
        <React.Fragment>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["date"]}</div>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["category"]}</div>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["subcategory"]}</div>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["cc"]}</div>
          <div className={"prevRec mt-3 " + creditsFontColor}>{CurrencyFormatter.format(this.state.current[this.state.currentIndex]["amount"])}</div>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["store"]}</div>
          <div className={"prevRec mt-3 " + fontSizeController}>{noteFiller}</div>
        </React.Fragment>
      )
    }

  }

  previousButton() {
    let currentIndex = this.state.currentIndex;

    if (currentIndex === this.state.current.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex += 1;
    }

    this.setState({ currentIndex });
    this.retrieveAllData();

  }

  nextButton() {
    let currentIndex = this.state.currentIndex;

    if (currentIndex === 0) {
      currentIndex = this.state.current.length - 1
    } else {
      currentIndex -= 1;
    }

    this.setState({ currentIndex });
    this.retrieveAllData();

  }

  retrieveAllData() {
    fetch(`/api/retrieveAllData.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({
          current
          // currentIndex: 0
        })
      })
  }


  componentDidMount() {
    this.retrieveAllData();
  }

  render() {

    const dropdownOptions = [
      [
        { value: 'Spendings', label: 'Spendings' },
        { value: 'Fixed', label: 'Fixed' },
        { value: 'Credits', label: 'Credits' },
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
        { value: 'BankAmericard', label: 'BankAmericard' },
        { value: 'BetterBalance', label: 'BetterBalance' }
      ],
    ];

    let colorFormatter;
    if (this.state.category === "Spendings") {
      colorFormatter = "spendings"
    } else if (this.state.category === "Fixed") {
      colorFormatter = "fixed";
    } else if (this.state.category === "Credits") {
      colorFormatter = "credits";
    };

    let addSideBoxFooter;
    if (this.state.current.length) {
      if (this.state.current[this.state.currentIndex]["category"] === "Spendings") {
        addSideBoxFooter = "test"
      } else if (this.state.current[this.state.currentIndex]["category"] === "Fixed") {
        addSideBoxFooter = "test";
      } else if (this.state.current[this.state.currentIndex]["category"] === "Credits") {
        addSideBoxFooter = "test";
      };
    }

      return (

        <div className="addWrapper">

          {/* right */}
          {/* <form className=""> */}
          <React.Fragment>
            <div className="addForm">
              <div className="mx-4">
                <DatePicker
                  selected={this.state.date}
                  onChange={this.dateHandleChange}
                  className="amount mt-4"
                />
              </div>

              <div className="mx-4 addInput">
                <Dropdown
                  onChange={this.categoryHandleChange}
                  options={dropdownOptions[0]}
                  arrowClosed={<span className="arrow-closed" />}
                  arrowOpen={<span className="arrow-open" />}
                  placeholder={this.state.category}
                  className="mt-4"
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
                />
              </div>

              <div className="mx-4 addInput">
                <input
                  value={this.state.where}
                  onChange={this.inputHandleChange}
                  placeholder="Where?"
                  name="where"
                  className="amount mt-4"
                />
              </div>

              <div className="mx-4 addInput">
                <input
                  value={this.state.notes}
                  onChange={this.inputHandleChange}
                  placeholder="Notes"
                  name="notes"
                  className="amount mt-4"
                />
              </div>

              <div className="mx-4 addInput">
                <div
                  onClick={() => this.handleSubmit()}
                  className={"addButton mt-4 text-center " + colorFormatter}> Add
                {/* className="addButton mt-4 text-center"> Add */}
                </div>
              </div>
            </div>

          </React.Fragment>

          {/* </form> */}
          {/* left */}
          <div className="previousRecordsWrapper">

            <div className="prevRecTop"> {/* top */}
              <div className="previousRecordsContainer">
                <div className="prevRec mt-3">Date</div>
                <div className="prevRec mt-3">Category</div>
                <div className="prevRec mt-3">SubCategory</div>
                <div className="prevRec mt-3">CC</div>
                <div className="prevRec mt-3">Amount</div>
                <div className="prevRec mt-3">Where?</div>
                <div className="prevRec mt-3">Notes</div>
                <div
                  onClick={() => this.nextButton()}
                  className="mt-4">
                  <i className="far addArrow fa-arrow-alt-circle-left"></i>
                </div>

              </div>

              <div className="previousRecordsContainer">

              {this.state.current.length ? this.renderSideBox() : null }

                <div
                  onClick={() => this.previousButton()}
                  className="mt-4">
                  <i className="far addArrow fa-arrow-alt-circle-right"></i>
                  </div>

              </div>
            </div>

            {/* bottom */}
            <div className={"prevRecBottom " + addSideBoxFooter}>{this.state.currentIndex + 1} of {this.state.current.length}</div>

          </div>

        </div>
      );
    // }


    }
  }
