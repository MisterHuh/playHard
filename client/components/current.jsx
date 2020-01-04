import React from "react";
import { CurrentData } from "./currentData";
import { CurrencyFormatter } from "./currencyFormatter";

export default class Current extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: [
        // {
        //   id: 1,
        //   date: "2019-12-15",
        //   category: "Spendings",
        //   subCategory: "Food",
        //   cc: "Amex",
        //   amount: 12.00,
        //   store: "Flame Broiler",
        //   notes: "delicious"
        // },
        // {
        //   id: 2,
        //   date: "2019-12-16",
        //   category: "Spendings",
        //   subCategory: "Food",
        //   cc: "Sapphire",
        //   amount: 4.00,
        //   store: "Starbucks",
        //   notes: "happy hour"
        // },
        // {
        //   id: 3,
        //   date: "2019-12-17",
        //   category: "Fixed",
        //   subCategory: "Utility",
        //   cc: "Freedom",
        //   amount: 4.20,
        //   store: "Electricity",
        //   notes: ""
        // },
        // {
        //   id: 4,
        //   date: "2019-12-18",
        //   category: "Spendings",
        //   subCategory: "Gifts",
        //   cc: "Amex",
        //   amount: 124.20,
        //   store: "Williams Sonoma",
        //   notes: "ding ding ding"
        // },
        // {
        //   id: 5,
        //   date: "2019-09-19",
        //   category: "Credit",
        //   subCategory: "Food",
        //   cc: "Venmo",
        //   amount: -12.50,
        //   store: "Starbucks",
        //   notes: "happy hour starbies"
        // }
      ],
      spendings: 0,
      credits: 0,
      fixed: 0,
      remaining: 0
    }
    this.test = this.test.bind(this);
    this.getCurrentData = this.getCurrentData.bind(this);
  };

  getCurrentData() {
    fetch(`/api/get.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({ current });
        console.log("this.current is:", this.state.current)
        this.test();
      })
  }

  test() {

    let current = this.state.current;
    let spendings = 0;
    let fixed = 0;
    let credits = 0;

    for (let index = 0; index <= 4; index++) {
      if (current[index]["category"] == "Spendings") {
        console.log("Spendings amount is: ", parseFloat(current[index]["amount"]))
        spendings += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Fixed") {
        console.log("Fixed amount is: ", parseFloat(current[index]["amount"]))
        fixed += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] == "Credit") {
        console.log("Credit amount is: ", parseFloat(current[index]["amount"]))
        credits += parseFloat(current[index]["amount"]);
      }
    }

    spendings = spendings.toFixed(2);
    fixed = fixed.toFixed(2);
    credits = credits.toFixed(2);

    // console.log("spendings is: ", spendings);
    // console.log("fixed is: ", fixed);
    // console.log("credits is: ", spendings);

    this.setState({
      spendings,
      fixed,
      credits
    })

    console.log("this.state.spendings is: ", this.state.spendings);
    console.log("this.state.fixed is: ", this.state.fixed);
    console.log("this.state.credits is: ", this.state.spendings);

  }

/*
  pull the Sun ~ Sat data based on the current week
  will eventually have to pull data from `Spendings` `Fixed` and `Credits`
  then join them together by date
*/

  componentDidMount() {
    this.getCurrentData();
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
            <div className="credit">Credit</div>
            <div className="fixed">Fixed</div>
            <div className="remaining">Remaining</div>
          </div>
          <div className="currentSummary">
            <div className="spendings">{CurrencyFormatter.format(spendings)}</div>
            <div className="credit">{CurrencyFormatter.format(credits)}</div>
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
