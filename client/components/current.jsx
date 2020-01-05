import React from "react";
import { CurrentData } from "./currentData";
import { CurrencyFormatter } from "./currencyFormatter";

export default class Current extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: [],
      spendings: 0,
      credits: 0,
      fixed: 0,
      remaining: 0
    }
    this.currentSummary = this.currentSummary.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
  };

  retrieveData() {
    fetch(`/api/get.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({ current });
        this.currentSummary();
      })
  }

  currentSummary() {

    let current = this.state.current;
    let length = current.length - 1;
    let spendings = 0;
    let fixed = 0;
    let credits = 0;

    for (let index = 0; index <= length; index++) {
      if (current[index]["category"] == "Spendings") {
        // console.log("Spendings amount is: ", parseFloat(current[index]["amount"]))
        spendings += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Fixed") {
        // console.log("Fixed amount is: ", parseFloat(current[index]["amount"]))
        fixed += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Credit") {
        // console.log("Credit amount is: ", parseFloat(current[index]["amount"]))
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

    console.log("this.state.current is: ", this.state.current)

  }

/*
  pull the Sun ~ Sat data based on the current week
  will eventually have to pull data from `Spendings` `Fixed` and `Credits`
  then join them together by date
*/

  componentDidMount() {
    this.retrieveData();
  }

  render() {

    let budget = 100;
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
            <CurrentData current={this.state.current} />
        </div>

      </div>

    )
  }
}
