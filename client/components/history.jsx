import React from "react";
import { RenderData } from "./renderData";
import { CurrencyFormatter } from "./currencyFormatter";

import Dropdown from "react-dropdown";
import 'react-dropdown/historyDropdown.css'


export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "All",
      current: [],
      totalSpendings: 0,
      totalCredits: 0,
      totalFixed: 0,
      totalBudget: 0,
      totalRemaining: 0,
      currentWeekNumber: 0
    }
    this.retrieveAllData = this.retrieveAllData.bind(this);
    this.currentSummary = this.currentSummary.bind(this);
    this.getTotalBudget = this.getTotalBudget.bind(this);
    this.categoryHandleChange = this.categoryHandleChange(this);
  }

  categoryHandleChange(e) {
    // console.log("event is: ", e);
    // console.log("event.value is: ", e.value);
    this.setState({ view: e.value })
  }

  retrieveAllData() {
    fetch(`/api/getHistory.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({ current });
        // this.getTotalBudget();
        this.currentSummary();
      })
  }

  getTotalBudget() {

    // let timestamp = new Date();
    // console.log("timestamp is: ", timestamp);

    // let sundayChecker = timestamp.getDay();
    // console.log("sundayChecker is: ", sundayChecker);

    // let currentWeek = require("current-week-number");
    // let currentWeekNumber;

    // if (sundayChecker === 0) {
    //   let followingDay = new Date(timestamp.getTime() + 86400000);
    //   console.log("followingDay is: ", followingDay);
    //   currentWeekNumber = currentWeek(followingDay);
    //   console.log("sundayChecker is 0");
    //   console.log("currentWeekNumber is: ", currentWeekNumber);
    // } else {
    //   currentWeekNumber = currentWeek(timestamp);
    //   console.log("sundayChecker is NOT 0");
    //   console.log("currentWeekNumber is: ", currentWeekNumber);
    // }

    // this.setState({ currentWeekNumber })

    let currentWeekNumber = this.props.currentWeekNumber;
    console.log("currentWeekNumber is: ", currentWeekNumber);
    this.setState({ currentWeekNumber })

  }

  currentSummary() {

    /* these 3 lines of code will probably replace getTotalBudget */
    /* is there too much happening here? */
    let currentWeekNumber = this.props.currentWeekNumber;
    console.log("currentWeekNumber is: ", currentWeekNumber);
    this.setState({ currentWeekNumber })

    let current = this.state.current;
    let length = current.length - 1;
    let totalSpendings = 0;
    let totalCredits = 0;
    let totalFixed = 0;
    let totalBudget = this.props.budget * this.state.currentWeekNumber;
    let totalRemaining = 0;

    for (let index = 0; index <= length; index++) {
      if (current[index]["category"] == "Spendings") {
        totalSpendings += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Fixed") {
        totalFixed += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Credits") {
        totalCredits += parseFloat(current[index]["amount"]);
      }
    }

    totalSpendings = totalSpendings.toFixed(2);
    totalCredits = totalCredits.toFixed(2);
    totalFixed = totalFixed.toFixed(2);
    totalRemaining = totalBudget - totalCredits - totalSpendings;

    this.setState({
      totalSpendings,
      totalCredits,
      totalFixed,
      totalBudget,
      totalRemaining
    })
    console.log("HISTORY VIEW totalBudget is: ", totalBudget);
    console.log("HISTORY VIEW totalRemaining is: ", totalRemaining);
    console.log("HISTORY VIEW this.state.current is: ", this.state.current)
  }

  componentDidMount() {
    this.retrieveAllData();
  }

  render() {

    const dropdownOptions = [
      { value: "all", name: "All"},
      { value: "spendings", name: "Spendings" },
      { value: "credits", name: "Credits" },
      { value: "fixed", name: "Fixed" }
    ];

    return (

      <React.Fragment>
      <div className="currentWrapperTop border">

        {/* one */}
        <div className="currentSummaryContainer border border-primary">
          <div className="currentSummary">
            <div className="budget">Filter By</div>
            <div className="">Start Date</div>
            <div className="">End Date</div>
            <div className="">Reset</div>
            {/* <div className="">Total Remaining</div> */}
          </div>
          <div className="currentSummary">
            <select
              onChange={this.categoryHandleChange}
              className="historyDropdown" >
              {dropdownOptions.map((e, key) => {
                return <option key={key} value={e.value}>{e.name}</option>;
              })}
            </select>
            <div className="">01/05/20</div>
            <div className="">01/11/20</div>
            <div className="">Search</div>
            {/* <div className="">{CurrencyFormatter.format(this.state.totalRemaining)}</div> */}
          </div>
        </div>

        {/* two */}
        <div className="currentSummaryContainer border border-primary">
          <div className="currentSummary">
            <div className="budget tooltipParent">
              Total Budget
              <span className="tooltipText">{"Current week is: " + this.state.currentWeekNumber}</span>
            </div>
            <div className="spendings">Total Spendings</div>
            <div className="credits">Total Credits</div>
            {/* <div className="fixed">Total Fixed</div> */}
            <div className="remaining">Total Remaining</div>
          </div>
          <div className="currentSummary">
            <div className="budget tooltipParent">
              {CurrencyFormatter.format(this.state.totalBudget)}
              {/* <span className="tooltipText">{"Current week is: " + this.state.currentWeekNumber}</span> */}
            </div>
            <div className="spendings">{CurrencyFormatter.format(this.state.totalSpendings)}</div>
            <div className="credits creditsFontColor">{CurrencyFormatter.format(this.state.totalCredits)}</div>
            {/* <div className="fixed">{CurrencyFormatter.format(this.state.totalFixed)}</div> */}
            <div className="remaining">{CurrencyFormatter.format(this.state.totalRemaining)}</div>
          </div>
        </div>

        {/* three */}
        <div className="currentSummaryContainer border border-primary">
          <div className="currentSummary">
            <div className="fixed">Groceries</div>
            <div className="fixed">Gas</div>
            <div className="fixed">Utilities</div>
            <div className="fixed">Total Remaining</div>
          </div>
          <div className="currentSummary">
            <div className="fixed">{CurrencyFormatter.format(this.state.totalBudget)}</div>
            <div className="fixed">{CurrencyFormatter.format(this.state.totalCredits)}</div>
            <div className="fixed">{CurrencyFormatter.format(this.state.totalFixed)}</div>
            <div className="fixed">{CurrencyFormatter.format(this.state.totalRemaining)}</div>
          </div>
        </div>

      </div>

        {/* <i className="icon fas fa-search-location border"></i> */}
        {/* <i className="icon fas fa-grin-hearts border"></i> */}
        {/* <i className="icon fas fa-hand-holding-usd border"></i> */}

        {/* <div className="currentDataContainer">
          <div className="currentData">
            <div className="currentDataHeader">Date</div>
            <div className="currentDataHeader">subCategory</div>
            <div className="currentDataHeader">cc</div>
            <div className="currentDataHeader">Amount</div>
            <div className="currentDataHeader">Store</div>
            <div className="currentDataHeader">Notes</div>
          </div>
          <RenderData current={this.state.current} />
        </div> */}

        <div className="currentWrapperBottom">
          <div className="currentData">
            <div className="currentDataHeader">Date</div>
            <div className="currentDataHeader">subCategory</div>
            <div className="currentDataHeader">cc</div>
            <div className="currentDataHeader">Amount</div>
            <div className="currentDataHeader">Store</div>
            <div className="currentDataHeader">Notes</div>
          </div>
          <RenderData current={this.state.current} />
        </div>

        </React.Fragment>



    )
  }
}
