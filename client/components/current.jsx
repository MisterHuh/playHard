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
        console.log("CURRENT current is: ", current);
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

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let unixTime = Date.now();
    let unixTime2 = Date.now();
    let date = new Date();
    let day = days[date.getDay()];
    // let time = date.getMilliseconds();
    let startDay, endDay;

    console.log("date is: ", date);
    console.log("day is: ", day);
    // console.log("time is: ", time);

    // if (day === "Monday" || day === "Tuesday" || day === "Wednesday" || day === "Thursday" || day === "Friday" || day === "Saturday") {
    //   day = "Not Sunday";
    // } else {
    //   day = "is Sunday";
    // }

    if (day === "Thursday") {
      console.log("day statement triggered");
      unixTime2 = unixTime - (86400 * 4);
      // var date = new Date(unix_timestamp * 1000);
      startDay = new Date(unixTime2 * 1000);
      endDay = days[startDay.getDay()];
    }

    console.log("endDay is: ", endDay);
    console.log("unixTime2 is: ", unixTime2);
    // console.log("day is: ", day);

    // let diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    // let diff2 = new Date(date.setDate(diff));
    // let d = new Date();

    // set to Monday of this week
    // d.setDate(d.getDate() - (d.getDay() + 6) % 7);

    // set to previous Monday
    // d.setDate(d.getDate() - 7);

    // create new date of day before
    // let sunday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);



    // let startOfWeek = moment().startOf('week').toDate();
    // let endOfWeek = moment().endOf('week').toDate();
    // console.log("sunday is: ", sunday);
    // console.log("diff2 is: ", diff2);
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

    console.log("componentDidMount fired");


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
    let testStartDate = "TEST";


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
                <div className="">{testStartDate}</div>
                <div className="">01/04/2020</div>
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
                <div className="mt-3">Total Remaining</div>
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
