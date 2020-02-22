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

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let date = new Date();

    let day = days[date.getDay()];

    let daysInMS = 1000 * 60 * 60 * 24; // 1 day
    let index = 5; // to find the start date
    let index1 = 0; // to find the end date
    let calculator = daysInMS * index; // # of days to subtract
    let calculator2 = daysInMS * index1; // # of days to add
    let findStartDate, findEndDate, formattedStartDate, formattedEndDate, formattedDate;

    if (day === "Friday") {

      findStartDate = new Date(date - calculator);
      // findEndDate = new Date(date + calculator2);
      findEndDate = date.setDate((date.getDate() + 1));

      // test = date.setDate(date.getDate()+5)
      // findEndDate = date.setDate(date.getDate() + 1);
      formattedStartDate = findStartDate.getFullYear() + "/" + (findStartDate.getMonth() + 1) + "/" + findStartDate.getDate();
      // formattedEndDate = findEndDate.getFullYear() + "/" + (findEndDate.getMonth() + 1) + "/" + findEndDate.getDate();



      // findStartDate = new Date();


      // formattedEndDate = findEndDate.getFullYear() + "/" + (findEndDate.getMonth() + 1) + "/" + findEndDate.getDate();
      // formattedDate = days[findEndDate.getDay()];
    }

    // var targetDate = new Date();
    // targetDate.setDate(targetDate.getDate() + 10);

    let test = calculator2 - calculator;
    console.log("findEndDate is: ", findEndDate);
    console.log("findStartDate is: ", findStartDate);
    console.log("test is: ", test);

    console.log("calculator is: ", calculator);
    console.log("calculator2 is: ", calculator2);
    console.log("date is: ", date);
    console.log("day is: ", day);

    // if (day === "Thursday") {
    //   console.log("day statement triggered");
    //   let jae = 1000 * 60 * 60 * 24 * 4;
    //   startDay = new Date(date - jae);
    //   endDay = days[startDay.getDay()];
    //   formatted_date = startDay.getFullYear() + "-" + (startDay.getMonth() + 1) + "-" + startDay.getDate();
    // }

    console.log("formattedStartDate is: ", formattedStartDate);
    console.log("formattedEndDate is: ", formattedEndDate);
    // console.log("formattedDate is: ", formattedDate);

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
