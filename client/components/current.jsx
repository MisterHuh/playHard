import React from "react";
import { RenderData } from "./renderData";
import { CurrencyFormatter } from "./currencyFormatter";

export default class Current extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      current: [],

      spendings: 0,
      credits: 0,
      budget: 0,
      remaining: 0,

      fixed: 0,
      groceries: 0,
      gas: 0,
      fixedEtc: 0,

      startDate: "",
      endDate: "",

      currentWeekNumber: 0
    }

    this.deleteEntry = this.deleteEntry.bind(this);
    this.currentSummary = this.currentSummary.bind(this);
    this.test = this.test.bind(this);
    this.retrieveCurrentData = this.retrieveCurrentData.bind(this);
    this.testTwo = this.testTwo.bind(this);
    this.retrieveNextWeek = this.retrieveNextWeek.bind(this);
  };

  retrieveCurrentData() {


    let endPoint = "getCurrent";

    // fetch(`/api/` + endPoint + `.php`)

    fetch(`/api/getCurrent.php`)
      .then(response => response.json())
      .then(current => {
        // console.log("CURRENT current is: ", current);
        this.setState({ current });
        this.currentSummary();
        this.testTwo();
      })
  }

  retrieveNextWeek() {
    console.log("retrieveNextWeek fired");
    fetch(`/api/getNextWeek.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({ current });
        this.currentSummary();
      })
  }

  testTwo() {

    let daysList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let rawStartDate, rawEndDate, unformattedStartDate, unformattedEndDate, startDate, endDate;
    let startDay, endDay, startMonth, endMonth;
    let start = new Date();
    let end = new Date();

    let startIndex = -6; // to find the start date
    let endIndex = 0; // to find the end date

    // Sunday
    // startIndex = 0;
    // endIndex = 6;

    // Monday
    // startIndex = -1;
    // endIndex = 5;

    // through
    // startIndex = -6;
    // endIndex = 0;

    let day = daysList[start.getDay()]; // finds the current day from daysList

    if (day === "Sunday") {
      startIndex = 0;
      endIndex = 6;
    } else if (day === "Monday") {
      startIndex = -1;
      endIndex = 5;
    } else if (day === "Tuesday") {
      startIndex = -2;
      endIndex = 4;
    } else if (day === "Wednesday") {
      startIndex = -3;
      endIndex = 3;
    } else if (day === "Thursday") {
      startIndex = -4;
      endIndex = 2;
    } else if (day === "Friday") {
      startIndex = -5;
      endIndex = 1;
    } else if (day === "Saturday") {
      startIndex = -6;
      endIndex = 0;
    }

    rawStartDate = start.setTime(start.getTime() + (startIndex * 24 * 60 * 60 * 1000));
    rawEndDate = end.setTime(end.getTime() + (endIndex * 24 * 60 * 60 * 1000));
    unformattedStartDate = new Date(rawStartDate);
    unformattedEndDate = new Date(rawEndDate);

    startDay = daysList[unformattedStartDate.getDay()].substring(0, 3);
    endDay = daysList[unformattedEndDate.getDay()].substring(0, 3);

    if ((unformattedStartDate.getMonth() + 1) <= 9) {
      console.log("yo the month is: ", unformattedStartDate.getMonth() + 1);
      startMonth = "0" + (unformattedStartDate.getMonth() + 1);
    };


    if ((unformattedEndDate.getMonth() + 1) <= 9) {
      console.log("yo the month is: ", unformattedEndDate.getMonth() + 1);
      endMonth = "0" + (unformattedEndDate.getMonth() + 1);
    };

    startDate = startDay + ", " + startMonth + "/" + unformattedStartDate.getDate();
    endDate = endDay + ", " + endMonth + "/" + unformattedEndDate.getDate();


    // if (day === "Saturday") {
    //   rawStartDate = start.setTime(start.getTime() + (startIndex * 24 * 60 * 60 * 1000));
    //   rawEndDate = end.setTime(end.getTime() + (endIndex * 24 * 60 * 60 * 1000));
    //   unformattedStartDate = new Date(rawStartDate);
    //   unformattedEndDate = new Date(rawEndDate);

    //   startDay = daysList[unformattedStartDate.getDay()].substring(0,3);
    //   endDay = daysList[unformattedEndDate.getDay()];

    //   if ((unformattedStartDate.getMonth() + 1) <= 9 ) {
    //     console.log("yo the month is: ", unformattedStartDate.getMonth() + 1);
    //     startMonth = "0" + (unformattedStartDate.getMonth() + 1);
    //   };

    //   startDate = startDay + ", " + startMonth + "/" + unformattedStartDate.getDate();
    //   endDate = endDay + ", " + (unformattedEndDate.getMonth() + 1) + "/" + unformattedEndDate.getDate();
    // }

    this.setState({ startDate, endDate })

    console.log("startDate is: ", startDate);
    console.log("endDate is: ", endDate);

  }

/* is there too much happening here? */
  currentSummary() {

    /* these 2 lines of code will probably replace getWeekNum */
    let currentWeekNumber = this.props.currentWeekNumber;
    this.setState({ currentWeekNumber })

    let current = this.state.current;

    let totalSpendings = 0;
    let totalCredits = 0;
    let totalBudget = this.props.budget;
    let totalRemaining = 0;

    let totalFixed = 0;
    let totalGroceries = 0;
    let totalGas = 0;
    let totalFixedEtc = 0;

    for (let index = 0; index < current.length ; index++) {
      if (current[index]["category"] === "Spendings") {
        totalSpendings += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] === "Credits") {
        totalCredits += parseFloat(current[index]["amount"]);
      } else if (current[index]["category"] === "Fixed") {
        if (current[index]["subcategory"] === "Groceries") {
          totalGroceries += parseFloat(current[index]["amount"]);
        } else if (current[index]["subcategory"] === "Gas") {
          totalGas += parseFloat(current[index]["amount"]);
        } else if (current[index]["subcategory"] === "Utility" || current[index]["subcategory"] === "Health" || current[index]["subcategory"] === "Entertainment") {
          totalFixedEtc += parseFloat(current[index]["amount"]);
        };
        totalFixed += parseFloat(current[index]["amount"]);
      }
    }

    totalSpendings = totalSpendings.toFixed(2);
    totalCredits = totalCredits.toFixed(2);
    totalFixed = totalFixed.toFixed(2);
    totalRemaining = totalBudget - totalCredits - totalSpendings;

    this.setState({
      spendings: totalSpendings,
      credits: totalCredits,
      budget: totalBudget,
      remaining: totalRemaining,
      fixed: totalFixed,
      groceries: totalGroceries,
      gas: totalGas,
      ficedEtc: totalFixedEtc
    })

  }

  deleteEntry(id) {
    console.log("current deleteEntry fired");
    let entryId = id;

    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId })
    };
    fetch(`/api/deleteEntry.php`, req)
      .then(response => response.json())
      .catch(error => {

      });
    this.retrieveCurrentData();

  }


  componentDidMount() {

    // console.log("componentDidMount fired");


    // let currentWeekNumber = this.props.currentWeekNumber;
    // this.setState({ currentWeekNumber })
    // let current = this.props.current;
    // this.setState({ current });
    // this.props.currentSummary();

    // this.test();


    // this.props.retrieveAllData();
    // console.log("componentDidMount finished");

    /* 2 */
    /* run retrieveCurrentData here, not on <App /> */
    this.retrieveCurrentData();
  }

  test() {
    console.log("test() fired");
    console.log("this.props.current is: ", this.props.current);
    let currentWeekNumber = this.props.currentWeekNumber;
    let current = this.props.current;

    this.setState({
      currentWeekNumber,
      current
     })

    this.props.currentSummary();

  }

  render() {

    // if (!this.state.budget) {
    //   <div>TEST</div>
    //   return null;
    // } else {

    // let testStartDate = new Date();
    // let testStartDate = "TEST";

    console.log("this.state.startDate is: ", this.state.startDate);
    console.log("this.state.endDate is: ", this.state.endDate);


      return (

        <React.Fragment>
          <div className="currentWrapperTop border border-primary">

            <div className="currentSummaryContainer border">
              <div className="currentSummary">
                <div className="">Current Week</div>
                <div className="">Start Date</div>
                <div className="">End Date</div>
                <div className="mt-3">Today's Date</div>
              </div>
              <div className="currentSummary">
                <div className="">{this.state.currentWeekNumber}</div>
                <div className="">{this.state.startDate ? this.state.startDate : null}</div>
                <div className="">{this.state.endDate ? this.state.endDate : null}</div>
                <div className="mt-3">12/25/2019</div>
              </div>
            </div>

            <div className="currentSummaryContainer border">
              <div className="currentSummary">
                <div className="budget remaining">Budget</div>
                <div className="spendings">Spendings</div>
                <div className="credits">Credits</div>
                <div className="mt-3">Remaining</div>
              </div>
              <div className="currentSummary">
                <div className="remaining budget">{CurrencyFormatter.format(this.state.budget)}</div>
                <div className="spendings">{CurrencyFormatter.format(this.state.spendings)}</div>
                <div className="credits">{CurrencyFormatter.format(this.state.credits)}</div>
                <div className="mt-3">{CurrencyFormatter.format(this.state.remaining)}</div>
              </div>
            </div>

            <div className="currentSummaryContainer border border-primary">
              <div className="currentSummaryHistory">
                <div className="fixed">Groceries</div>
                <div className="fixed">Gas</div>
                <div className="fixed tooltipParent">
                  Etc
                  <span className="tooltipText">Utilities & Entertainment</span>
                </div>
                <div className="mt-3">Total Fixed</div>
              </div>
              <div className="currentSummaryHistory">
                <div className="fixed">{CurrencyFormatter.format(this.state.groceries)}</div>
                <div className="fixed">{CurrencyFormatter.format(this.state.gas)}</div>
                <div className="fixed">{CurrencyFormatter.format(this.state.fixedEtc)}</div>
                <div className="mt-3">{CurrencyFormatter.format(this.state.fixed)}</div>
              </div>
            </div>

          </div>

          <div className="currentWrapperBottom">
            <div className="currentDataContainer">
              <div className="currentData">
                <div className="currentDataHeader">
                  <i className="arrow fas fa-caret-left"></i>
                  Date
                  <i
                    onClick={() => this.retrieveNextWeek()}
                    className="arrow fas fa-caret-right"
                  ></i>
                </div>
                <div className="currentDataHeader">subCategory</div>
                <div className="currentDataHeader">cc</div>
                <div className="currentDataHeader">Amount</div>
                <div className="currentDataHeader">Store</div>
                <div className="currentDataHeader">Notes</div>
              </div>

              <React.Fragment>
                {this.state.current.map(entry => {
                  return (
                    <RenderData
                      current={this.state.current}
                      entry={entry}
                      key={entry["id"]}
                      deleteEntry={this.deleteEntry}
                    />
                  )
                })
                }
              </React.Fragment>


              {/* <RenderData current={this.state.current} /> */}


            </div>
          </div>
        </React.Fragment>

      )
    // }
  }
}
