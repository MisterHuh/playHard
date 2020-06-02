import React from "react";

import { CurrencyFormatter, TotalSummary, GetCurrentWeekNum, RenderData } from "./helperFunctions";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from "react-dropdown";
import 'react-dropdown/style.css'
import TestUtils from "react-addons-test-utils";


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

    this.retrieveAddSideBox = this.retrieveAddSideBox.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  dateHandleChange(date) {
    this.setState({ date });
  };

  categoryHandleChange(e) {
    if (e.target.id === "Fixed") {
      this.setState({
        category: e.target.id,
        subCategory: "Groceries",
        cc: "AmEx"
       })
    } else {
      this.setState({
        category: e.target.id,
        subCategory: "Food",
        cc: "Sapphire"
       })
    };
  }

  subCategoryHandleChange(e) {
    // console.log("SUB event is: ", e);
    // console.log("SUB event.value is: ", e.value);
    this.setState({ subCategory: e.value})
  }

  ccHandleChange(e) {
    this.setState({ cc: e.target.id })
  }

  inputHandleChange(e) {
    e.preventDefault();

    const formErrors = this.state.formErrors;
    const { name, value } = e.target;
    const firstLastWhiteSpace = RegExp(/\s+$/, '');
    const numberChecker = RegExp(/[^0-9.,]+/);

    switch(name) {
      case "amount":
        formErrors.amount = numberChecker.test(value) || firstLastWhiteSpace.test(value) || value.length < 1
        ? 'enter a valid amount'
        : "";
        break;
      case "where":
        formErrors.where = value.length < 1 || firstLastWhiteSpace.test(value)
        ? 'entry required'
        : "";
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

     this.retrieveAddSideBox();
  }

  renderSideBox() {
    let creditsFontColor = this.state.current[this.state.currentIndex]["amount"] < 0 ? "creditsFontColor" : null;
    let fontSizeController = this.state.current[this.state.currentIndex]["notes"].length >= 19 ? "renderSideBoxFont": null;
    let noteFiller = this.state.current[this.state.currentIndex]["notes"] ? this.state.current[this.state.currentIndex]["notes"]  : "-";

    if (this.state.current) {
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
    this.retrieveAddSideBox();

  }

  nextButton() {
    let currentIndex = this.state.currentIndex;

    if (currentIndex === 0) {
      currentIndex = this.state.current.length - 1
    } else {
      currentIndex -= 1;
    }

    this.setState({ currentIndex });
    this.retrieveAddSideBox();

  }

  retrieveAddSideBox() {
    fetch(`/api/retrieveAddSideBox.php`)
      .then(response => response.json())
      .then(current => {
        console.log("current is: ", current);
        console.log("1.5 CDM add.jsx");
        this.setState({ current })
      })
  }

  componentDidMount() {
    console.log("1. CDM add.jsx");
    this.retrieveAddSideBox();
  }

  render() {

    const dropdownOptions = [
      [ // category
        { value: 'Spendings', label: 'Spendings' },
        { value: 'Fixed', label: 'Fixed' },
        { value: 'Credits', label: 'Credits' },
        { value: 'Payday', label: 'Payday' },
        { value: 'Vacation', label: 'Vacation' },
        { value: 'Wedding', label: 'Wedding' }
      ],
      [ // subCategory - default / spendings
        { value: 'Food', label: 'Food' },
        { value: 'Groceries', label: 'Groceries' },
        { value: 'Gas', label: 'Gas' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Gifts', label: 'Gifts' },
        { value: 'Home', label: 'Home' },
        { value: 'Dogs', label: 'Dogs' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Emergency', label: 'Emergency' },
        { value: 'Utility', label: 'Utility' },
        { value: 'Health', label: 'Health' },
        { value: 'Automobile', label: 'Automobile' }
      ],
      [ // subCategory - fixed
        { value: 'Groceries', label: 'Groceries' },
        { value: 'Food', label: 'Food' },
        { value: 'Gas', label: 'Gas' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Gifts', label: 'Gifts' },
        { value: 'Home', label: 'Home' },
        { value: 'Dogs', label: 'Dogs' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Emergency', label: 'Emergency' },
        { value: 'Utility', label: 'Utility' },
        { value: 'Health', label: 'Health' },
        { value: 'Automobile', label: 'Automobile' }
      ],
      [ // CC
        { value: 'AmEx', label: 'AmEx' },
        { value: 'Freedom', label: 'Freedom' },
        { value: 'Sapphire', label: 'Sapphire' },
        { value: 'Venmo', label: 'Venmo' },
        { value: 'BankAmericard', label: 'BankAmericard' },
        { value: 'BetterBalance', label: 'BetterBalance' }
      ],
      [ // CC for when category-Credit has been selected
        { value: 'Venmo', label: 'Venmo' },
        { value: 'Sapphire', label: 'Sapphire' },
        { value: 'AmEx', label: 'AmEx' },
        { value: 'Freedom', label: 'Freedom' },
      ]
    ];


    let colorFormatter;
    if (this.state.category === "Spendings") {
      colorFormatter = "addButtonSpendings spendings"
    } else if (this.state.category === "Fixed") {
      colorFormatter = "addButtonFixed fixed";
    } else if (this.state.category === "Credits") {
      colorFormatter = "addButtonCredits credits";
    } else if (this.state.category === "Payday") {
      colorFormatter = "addButtonPayday payday";
    } else if (this.state.category === "Wedding") {
      colorFormatter = "addButtonWedding wedding";
    } else if (this.state.category === "Vacation") {
      colorFormatter = "addButtonVacation vacation";
    };

    let negativeFontColor = this.state.amount < 0 ? "creditsFontColor" : "negativeNotWorking";

    let addSideBoxFooter;
    if (this.state.current.length) {
      if (this.state.current[this.state.currentIndex]["category"] === "Spendings") {
        addSideBoxFooter = "addSideBoxFooterSpendings"
      } else if (this.state.current[this.state.currentIndex]["category"] === "Fixed") {
        addSideBoxFooter = "addSideBoxFooterFixed";
      } else if (this.state.current[this.state.currentIndex]["category"] === "Credits") {
        addSideBoxFooter = "addSideBoxFooterCredits";
      } else if (this.state.current[this.state.currentIndex]["category"] === "Wedding") {
        addSideBoxFooter = "addSideBoxFooterWedding";
      } else if (this.state.current[this.state.currentIndex]["category"] === "Vacation") {
        addSideBoxFooter = "addSideBoxFooterVacation";
      };
    }

    let subcatDropdown;
    this.state.category === "Fixed"
      ? subcatDropdown = dropdownOptions[2]
      : subcatDropdown = dropdownOptions[1];

    // let ccDropdown;
    // this.state.category === "Credits"
    //   ? ccDropdown = dropdownOptions[4]
    //   : ccDropdown = dropdownOptions[3];

    // let placeholder;
    // this.state.category === "Credits"
    //   ? placeholder = "Venmo"
    //   : placeholder = this.state.cc;

    let shakeIt_amount;
    this.state.formErrors.amount.length > 0
      ? shakeIt_amount = "shakeIt"
      : shakeIt_amount = "";

    let shakeIt_where;
    this.state.formErrors.where.length > 0
      ? shakeIt_where = "shakeIt"
      : shakeIt_where = "";


    let catButtonSpendings, catButtonCredits, catButtonFixed, catButtonWedding, catButtonVacation;
    let ccButtonSapphire, ccButtonAmEx, ccButtonVenmo, ccButtonFreedom, ccButtonBB;

    this.state.cc === "AmEx"
      ? ccButtonAmEx = " ccSelector"
      : "";

    this.state.cc === "Sapphire"
      ? ccButtonSapphire = " ccSelector"
      : "";

    this.state.cc === "Venmo"
      ? ccButtonVenmo = " ccSelector"
      : "";

    this.state.cc === "Freedom"
      ? ccButtonFreedom = " ccSelector"
      : "";

    this.state.cc === "BB"
      ? ccButtonBB = " ccSelector"
      : "";



    switch (this.state.category) {
      case "Spendings":
        catButtonSpendings = "catButtonSpendings";
        break;
      case "Credits":
        catButtonCredits = "catButtonCredits";
        break;
      case "Fixed":
        catButtonFixed = "catButtonFixed";
        break;
      case "Wedding":
        catButtonWedding = "catButtonWedding";
        break;
      case "Vacation":
        catButtonVacation = "catButtonVacation";
        break;
      default:
        break;
    }

      return (

        <div className="addWrapper">

          {/* right */}
          <div className="addForm">
            <div className="mx-4 addFormSpacing">

              <div className="formValidationContainer"></div>
              <DatePicker
                selected={this.state.date}
                onChange={this.dateHandleChange}
                className="amount "
              />
            </div>

            <div className="mx-4 addInput">
              <div className="formValidationContainer"></div>

              <div className="catButtonContainer">
                <div onClick={this.categoryHandleChange} id="Spendings" className={"catButton " + catButtonSpendings} value="Spendings">Spendings</div>
                <div onClick={this.categoryHandleChange} id="Fixed" className={"catButton " + catButtonFixed} value="Fixed">Fixed</div>
                <div onClick={this.categoryHandleChange} id="Credits" className={"catButton " + catButtonCredits} value="Credits">Credits</div>
                <div onClick={this.categoryHandleChange} id="Vacation" className={"catButton " + catButtonVacation} value="Vacation">Vacation</div>
                <div onClick={this.categoryHandleChange} id="Wedding" className={"catButton " + catButtonWedding} value="Wedding">Wedding</div>
              </div>


              {/* <Dropdown
                onChange={this.categoryHandleChange}
                options={dropdownOptions[0]}
                arrowClosed={<span className="arrow-closed" />}
                arrowOpen={<span className="arrow-open" />}
                placeholder={this.state.category}
                className=""
              /> */}
            </div>

            <div className="mx-4 addInput">
              <div className="formValidationContainer"></div>
              <Dropdown
                onChange={this.subCategoryHandleChange}
                // options={dropdownOptions[1]}
                options={subcatDropdown}
                arrowClosed={<span className="arrow-closed" />}
                arrowOpen={<span className="arrow-open" />}
                placeholder={this.state.subCategory}
                className=""
              />
            </div>

            <div className="mx-4 addInput">
              <div className="formValidationContainer"></div>

              <div className="catButtonContainer">
                <div onClick={this.ccHandleChange} id="Sapphire" className={"catButton " + ccButtonSapphire}>Sapphire</div>
                <div onClick={this.ccHandleChange} id="AmEx" className={"catButton " + ccButtonAmEx} >AmEx</div>
                <div onClick={this.ccHandleChange} id="Venmo" className={"catButton " + ccButtonVenmo} >Venmo</div>
                <div onClick={this.ccHandleChange} id="Freedom" className={"catButton " + ccButtonFreedom} >Freedom</div>
                <div onClick={this.ccHandleChange} id="BB" className={"catButton " + ccButtonBB} >BB</div>
              </div>


              {/* <Dropdown
                onChange={this.ccHandleChange}
                options={ccDropdown}
                arrowClosed={<span className="arrow-closed" />}
                arrowOpen={<span className="arrow-open" />}
                placeholder={placeholder}
                className=""
              /> */}


            </div>

            <div className="mx-4 addInput test">

              <div className="formValidationContainer">
                <div className="textFadeOutContainer">
                  {this.state.formErrors.amount.length > 0 && (
                    <div className="textFadeOut ">{this.state.formErrors.amount}</div>
                  )}
                </div>

                {/* <div className="required">* Required</div> */}
              </div>

              <input
                id={shakeIt_amount}
                type="number"
                value={this.state.amount}
                onChange={this.inputHandleChange}
                placeholder="$ 00.00"
                name="amount"
                className="amount"
              />
            </div>

            <div className="mx-4 addInput test">

              <div className="formValidationContainer">
                <div className="textFadeOutContainer">
                  {this.state.formErrors.where.length > 0 && (
                    <div className="textFadeOut">{this.state.formErrors.where}</div>
                  )}
                </div>

                {/* <div className="required">* Required</div> */}
              </div>

              <input
                id={shakeIt_where}
                value={this.state.where}
                onChange={this.inputHandleChange}
                placeholder="Where?"
                name="where"
                // className={"amount " + shakeIt_where}
                className="amount"
              />
            </div>

            <div className="mx-4 addInput">
              <div className="formValidationContainer"></div>
              <input
                value={this.state.notes}
                onChange={this.inputHandleChange}
                placeholder="Notes"
                name="notes"
                className="amount "
              />
            </div>

            <div className="mx-4 addInput">
              <div className="formValidationContainer"></div>
              <div
                onClick={() => this.handleSubmit()}
                className={"addButton text-center " + colorFormatter}> Add
              </div>
            </div>
          </div> {/* addForm */}


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
            <div className={"prevRecBottom " + addSideBoxFooter}>
              {this.state.currentIndex + 1} of {this.state.current.length}
            </div>

          </div> {/* previousRecordsWrapper */}

        {/* addWrapper */}
        </div>
      );
    }
  }
