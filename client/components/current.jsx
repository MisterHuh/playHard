import React from "react";
import { CurrentData } from "./currentData";
import { CurrencyFormatter } from "./currencyFormatter";


export default class Current extends React.Component {
  constructor(props) {
    super(props);
    // this.state: []
    this.state = {
      current: [
        {
          id: 1,
          date: "2019-12-15",
          category: "Spendings",
          subCategory: "Food",
          cc: "Amex",
          amount: 12.00,
          store: "Flame Broiler",
          notes: "delicious"
        },
        {
          id: 2,
          date: "2019-12-16",
          category: "Spendings",
          subCategory: "Food",
          cc: "Sapphire",
          amount: 4.00,
          store: "Starbucks",
          notes: "happy hour"
        },
        {
          id: 3,
          date: "2019-12-17",
          category: "Fixed",
          subCategory: "Utility",
          cc: "Freedom",
          amount: 4.20,
          store: "Electricity",
          notes: ""
        },
        {
          id: 4,
          date: "2019-12-18",
          category: "Spendings",
          subCategory: "Gifts",
          cc: "Amex",
          amount: 124.20,
          store: "Williams Sonoma",
          notes: "ding ding ding"
        },
        {
          id: 5,
          date: "2019-09-19",
          category: "Credit",
          subCategory: "Food",
          cc: "Venmo",
          amount: -12.50,
          store: "Starbucks",
          notes: "happy hour starbies"
        }
      ],
      spendings: 0,
      credits: 0,
      remaining: 0
    }
    this.test = this.test.bind(this);
  };

  /*
    on componentDidMount(), pull the Sun ~ Sat data based on the current week
    the store it as state
    map through the state, and spit out <currentData/>, which will be each row
    each object will be an entry

    will eventually have to pull data from `Spendings` `Fixed` and `Credits`
    then join them together by date
  */

  // mapThrough() {
  //   for (let index = 0; index < this.state.current.length; index++) {

  //   }
  // }

  test() {
    let totalSpendings = 0;

    // this.state.current.map(entry => {
    //   totalSpendings += entry.amount;
    // })



    console.log("totalSpendings is: ", totalSpendings);
    return totalSpendings;
  }


  render() {
    console.log("this.state.current is: ", this.state.current);

    let currencyFormatter = CurrencyFormatter.format();

    return (

      <React.Fragment>
      <div className="currentWrapper mt-4">

        <div className="currentContainer">
          <div className="currentBox"></div>
          <div className="currentBox spendings">Spendings</div>
          <div className="currentBox credit">Credit</div>
          <div className="currentBox remaining">Remaining</div>
        </div>

        <div className="currentContainer">
          <div className="currentBox">Spendings</div>
          <div className="currentBox spendings"></div>
          <div className="currentBox credit"></div>
          <div className="currentBox remaining"></div>
       </div>

        <div className="currentContainer">
          <div className="currentBox">Fixed</div>
          <div className="currentBox spendings"></div>
          <div className="currentBox credit"></div>
          <div className="currentBox remaining"></div>
        </div>

      </div>

      <div className="mt-4 currentTableHeaderContainer">
        <div className="currentTableHeader">
          <div className="currentTableRow">Date</div>
          <div className="currentTableRow">subCategory</div>
          <div className="currentTableRow">cc</div>
          <div className="currentTableRow">Amount</div>
          <div className="currentTableRow">Store</div>
          <div className="currentTableRow">Notes</div>
        </div>
        <CurrentData current={this.state.current}/>
      </div>

      </React.Fragment>

    )
  }
}
