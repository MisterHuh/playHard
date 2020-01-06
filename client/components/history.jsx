import React from "react";
import { RenderData } from "./renderData";
import { CurrencyFormatter } from "./currencyFormatter";

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: [],
      spendings: 0,
      credits: 0,
      fixed: 0,
      remaining: 0
    }
    this.retrieveAllData = this.retrieveAllData.bind(this);
    this.currentSummary = this.currentSummary.bind(this);
    this.getWeekNumber = this.getWeekNumber.bind(this);
  }

  retrieveAllData() {
    fetch(`/api/getHistory.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({ current });
        this.currentSummary();
      })
  }

  getWeekNumber() {
    let firstWeek = new Data(this.getFullYear(), 0, 1);
    console.log("firstWeek is: ", firstWeek);
  }

  currentSummary() {

    let current = this.state.current;
    let length = current.length - 1;
    let spendings = 0;
    let fixed = 0;
    let credits = 0;

    for (let index = 0; index <= length; index++) {
      if (current[index]["category"] == "Spendings") {
        spendings += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Fixed") {
        fixed += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Credit") {
        credits += parseFloat(current[index]["amount"]);
      }
    }

    spendings = spendings.toFixed(2);
    fixed = fixed.toFixed(2);
    credits = credits.toFixed(2);

    this.setState({
      spendings,
      fixed,
      credits
    })

    console.log("HISTORY VIEW this.state.current is: ", this.state.current)
  }

  componentDidMount() {
    this.retrieveAllData();
    // this.getWeekNumber();
  }

  render() {

    let budget = 500;
    let spendings = this.state.spendings;
    let credits = this.state.credits;
    let fixed = this.state.fixed;
    let remaining = budget - credits - spendings;

    return (

      <div className="currentWrapper">

        <div className="currentSummaryContainer">
          <div className="currentSummary">
            <div className="spendings">Spendings</div>
            <div className="credits">Credits</div>
            <div className="fixed">Fixed</div>
            <div className="remaining">Remaining</div>
          </div>
          <div className="currentSummary">
            <div className="spendings">{CurrencyFormatter.format(spendings)}</div>
            <div className="credits">{CurrencyFormatter.format(credits)}</div>
            <div className="fixed">{CurrencyFormatter.format(fixed)}</div>
            <div className="remaining">{CurrencyFormatter.format(remaining)}</div>
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
