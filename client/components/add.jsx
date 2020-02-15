import React from "react";

import { CurrencyFormatter } from "./currencyFormatter";
import { RenderSideBox } from "./renderSideBox";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from "react-dropdown";
import 'react-dropdown/style.css'


export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      current: [],
      currentIndex: 100,

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
    this.setCurrentIndex = this.setCurrentIndex.bind(this);
    // this.renderSideBox = this.renderSideBox.bind(this);
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

    // console.log("this.state.date is: ", this.state.date);
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
        console.error('delete error: ', error);
        alert("need input!");
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

  renderSideBox() {
    console.log("this.state.currentIndex is: ", this.state.currentIndex);
    console.log("this.state.current is: ", this.state.current);

    if (this.state.current) {
      console.log("this.state.current[this.state.currentIndex]['id'] is: ", this.state.current[this.state.currentIndex]['id']);
      return (
        <React.Fragment>
          {/* <div className="prevRec mt-3">{this.state.current[1]["date"]}</div> */}

          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["id"]}</div>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["date"]}</div>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["category"]}</div>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["subcategory"]}</div>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["cc"]}</div>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["amount"]}</div>
          <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["store"]}</div>
          {/* <div className="prevRec mt-3">{this.state.current[this.state.currentIndex]["notes"]}</div> */}

        </React.Fragment>
      )
    }

  }

  previousButton() {
    // let currentIndex = this.state.current.length;
    // console.log("currentIndex is: ", currentIndex);

    let currentIndex = this.state.currentIndex;
    console.log("currentIndex is: ", currentIndex);

    // if (currentIndex === 101) {
    //   this.setState({ currentIndex: 100 })
    // } else {
    //   currentIndex -= 1;
    //   this.setState({ currentIndex });
    // }

    if (currentIndex === this.state.current.length - 1) {
      alert ("you are at the end")
    } else {

      currentIndex += 1;
      console.log("previousButton currentIndex is: ", currentIndex);
      this.setState({ currentIndex });
    }

    // currentIndex += 1;
    // console.log("previousButton currentIndex is: ", currentIndex);
    // this.setState({ currentIndex });

  }

  nextButton() {
    let currentIndex = this.state.current.length;
    currentIndex += 1;
    console.log("currentIndex is: ", currentIndex);
    this.setState({ currentIndex });
  }

  retrieveAllData() {

    // console.log("ADD retrieveAllData fired");
    fetch(`/api/retrieveAllData.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({ current })
        // this.setCurrentIndex(current.length)
        // console.log("ADD current.length is: ", current.length);
        // console.log("ADD this.state.current is: ", this.state.current);
      })

      // let currentIndex = this.state.current.length;

    // this.setState({ currentIndex: this.state.current.length });
    // console.log("this.state.currentIndex is: ", this.state.currentIndex);

  }

  setCurrentIndex( currentIndex) {
    this.setState({ currentIndex: currentIndex })
  };

  componentDidMount() {
    // console.log("componentDidMount fired");
    this.retrieveAllData();
    // this.setState({ currentIndex: this.state.current.length });
    // console.log("this.state.currentIndex is: ", this.state.currentIndex);
    // console.log("this.state.current is: ", this.state.current);
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

    let currentIndex = this.state.currentIndex;
    // let creditsFontColor = this.state.current[currentIndex]["amount"] < 0 ? "creditsFontColor" : null;

    // if (!this.state.currentIndex) {
    //   console.log("test");
    //   return null;
    // } else

    // if (this.state.currentIndex) {
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
                  className="prevRecButton mt-4">Next</div>
                {/* <i className="arrow fas fa-caret-left mt-4"></i> */}
              </div>

              <div className="previousRecordsContainer">

              {this.state.current.length ? this.renderSideBox() : null }
              {/* {console.log("test")} */}

                {/* <div className="prevRec mt-3">{this.state.current[currentIndex]["date"]}</div>
                <div className="prevRec mt-3">{this.state.current[currentIndex]["category"]}</div>
                <div className="prevRec mt-3">{this.state.current[currentIndex]["subcategory"]}</div>
                <div className="prevRec mt-3">{this.state.current[currentIndex]["cc"]}</div>
                <div className="prevRec mt-3">{CurrencyFormatter.format(this.state.current[currentIndex]["amount"])}</div>
                <div className="prevRec mt-3">{this.state.current[currentIndex]["store"]}</div>
                <div className="prevRec mt-3">{this.state.current[currentIndex]["notes"]}</div> */}

                {/* <RenderSideBox current={this.state.current} currentIndex={this.state.currentIndex} previousButton={this.previousButton}/> */}

                <div
                  onClick={() => this.previousButton()}
                  className="prevRecButton mt-4">Previous</div>

              </div>
            </div>

            {/* bottom */}
      <div className="prevRecBottom">{currentIndex} of {this.state.current.length - 1}</div>

          </div>

        </div>
      );
    // }


    }
  }
