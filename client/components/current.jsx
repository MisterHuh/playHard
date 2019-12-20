import React from "react";
import { CurrentData } from "./currentData";

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
          notes: ""
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
      ]
    }
  }



// {
//   id: 1,
//   date: "2019-12-15",
//   category: "Spendings",
//   subCategory: "Food",
//   cc: "Amex",
//   amount: 12.00,
//   store: "Flame Broiler",
//   notes: ""
// },


  /*
    on componentDidMount(), pull the Sun ~ Sat data based on the current week
    the store it as state
    map through the state, and spit out <currentData/>, which will be each row
    each object will be an entry

    will eventually have to pull data from `Spendings` `Fixed` and `Credits`
    then join them together by date
  */


  render() {
    console.log("this.state.current is: ", this.state.current);

    return (

      <React.Fragment>
      <div className="currentWrapper mt-4">

        <div className="currentContainer">
          <div className="currentBox"></div>
          <div className="currentBox">Total Spent</div>
          <div className="currentBox">Credit</div>
          <div className="currentBox">Remaining</div>
        </div>

        <div className="currentContainer">
          <div className="currentBox">Spendings</div>
          <div className="currentBox">$12.00</div>
          <div className="currentBox">$12.00</div>
          <div className="currentBox">$12.00</div>
       </div>

        <div className="currentContainer">
          <div className="currentBox">Fixed</div>
          <div className="currentBox">$12.00</div>
          <div className="currentBox">$12.00</div>
          <div className="currentBox">$12.00</div>
        </div>

      </div>

      <div className="mt-4">
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



      // <div className="currentFixed my-4">
      //   <div className="item item-1">item-1</div>
      //   <div className="item item-2">item-2</div>
      //   <div className="item item-3">item-3</div>
      // </div>

    )
  }
}
