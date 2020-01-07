import React from "react";
import { RenderData } from "./renderData";
import { CurrencyFormatter } from "./currencyFormatter";

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  retrieveAllData() {
    fetch(`/api/getHistory.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({ current });
        this.getTotalBudget();
        this.currentSummary();
      })
  }

  getTotalBudget() {

    let timestamp = new Date();
    console.log("timestamp is: ", timestamp);

    let sundayChecker = timestamp.getDay();
    console.log("sundayChecker is: ", sundayChecker);

    let currentWeek = require("current-week-number");
    let currentWeekNumber;

    if (sundayChecker === 0) {
      let followingDay = new Date(timestamp.getTime() + 86400000);
      console.log("followingDay is: ", followingDay);
      currentWeekNumber = currentWeek(followingDay);
      console.log("sundayChecker is 0");
      console.log("currentWeekNumber is: ", currentWeekNumber);
    } else {
      currentWeekNumber = currentWeek(timestamp);
      console.log("sundayChecker is NOT 0");
      console.log("currentWeekNumber is: ", currentWeekNumber);
    }

    this.setState({ currentWeekNumber })

  }

  currentSummary() {

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
    // this.getTotalBudget();
  }

  render() {

    // let budget = 500;
    // let spendings = this.state.totalSpendings;
    // let credits = this.state.totalCredits;
    // let fixed = this.state.totalFixed;
    // let remaining = budget - credits - spendings;

    return (

      <div className="currentWrapper">

        <div className="currentSummaryContainer">
          <div className="currentSummary">
            <div className="budget">Total Budget</div>
            <div className="spendings">Total Spendings</div>
            <div className="credits">Total Credits</div>
            <div className="fixed">Total Fixed</div>
            <div className="remaining">Total Remaining</div>
          </div>
          <div className="currentSummary">
            <div className="budget">{CurrencyFormatter.format(this.state.totalBudget)}</div>
            <div className="spendings">{CurrencyFormatter.format(this.state.totalSpendings)}</div>
            <div className="credits creditsFontColor">{CurrencyFormatter.format(this.state.totalCredits)}</div>
            <div className="fixed">{CurrencyFormatter.format(this.state.totalFixed)}</div>
            <div className="remaining">{CurrencyFormatter.format(this.state.totalRemaining)}</div>
          </div>
        </div>

        <div className="currentDataContainer">
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

      </div>

    )
  }
}
