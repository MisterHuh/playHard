import React from "react";
import Add from "./add";
import Current from "./current";
import { Navbar } from "./navbar";
import History from "./history"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "current",
      budget: 150,

      current: [],

      spendings: 0,
      credits: 0,
      budget: 0,
      remaining: 0,

      fixed: 0,
      groceries: 0,
      gas: 0,
      fixedEtc: 0,

      currentWeekNumber: 1,
      // current: [],
      // query: ""
    }
    this.setView = this.setView.bind(this);
    this.getWeekNum = this.getWeekNum.bind(this);
    this.retrieveAllData = this.retrieveAllData.bind(this);
    this.currentSummary = this.currentSummary.bind(this);
  }

  setView(view) {
    this.setState({  view  })
  };

  getWeekNum() {

    // console.log(2);
    // console.log("APP getWeekNum fired");
    let timestamp = new Date();
    // console.log("timestamp is: ", timestamp);

    let sundayChecker = timestamp.getDay();
    // console.log("sundayChecker is: ", sundayChecker);

    let currentWeek = require("current-week-number");
    let currentWeekNumber;

    if (sundayChecker === 0) {
      let followingDay = new Date(timestamp.getTime() + 86400000);
      // console.log("followingDay is: ", followingDay);
      currentWeekNumber = currentWeek(followingDay);
      // console.log("sundayChecker is 0");
      // console.log("currentWeekNumber is: ", currentWeekNumber);
    } else {
      currentWeekNumber = currentWeek(timestamp);
      // console.log("sundayChecker is NOT 0");
      // console.log("currentWeekNumber is: ", currentWeekNumber);
    }
    this.setState({ currentWeekNumber })

  }

  /* is there too much happening here? */
  currentSummary() {

    /* these 2 lines of code will probably replace getWeekNum */
    // let currentWeekNumber = this.props.currentWeekNumber;
    // this.setState({ currentWeekNumber })

    let currentWeekNumber = this.state.currentWeekNumber;

    let current = this.state.current;

    let totalSpendings = 0;
    let totalCredits = 0;
    let totalBudget = this.state.budget;
    let totalRemaining = 0;

    let totalFixed = 0;
    let totalGroceries = 0;
    let totalGas = 0;
    let totalFixedEtc = 0;

    for (let index = 0; index < current.length; index++) {
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

  retrieveAllData() {

    console.log("retrieveData fired");

    let endpoint;
    if (this.state.view === "add") {
      endpoint = "getCurrent"
    } else {
      endpoint = "retrieveAllData";
    }

    console.log("endpoint is: ", endpoint);

    fetch(`/api/` + endpoint + `.php`)
      .then(response => response.json())
      .then(current => {
        console.log("retrieveData current is: ", current);
        this.setState({ current });
        this.currentSummary();
      })
  };

  componentDidMount() {
    this.getWeekNum();
    this.retrieveAllData();

  }

  render() {

    let currentView = this.state.view;
    let displayView = null;

    if (currentView === 'add') {
      displayView = <Add setView={this.setView} />;
    } else if (currentView === "current") {
      displayView =
        <Current
          view={this.state.view}
          budget={this.state.budget}
          currentWeekNumber={this.state.currentWeekNumber}
          retrieveAllData={this.retrieveAllData}
          deleteEntry={this.deleteEntry}
          current={this.state.current}
          currentSummary={this.currentSummary}

          />
    } else if (currentView === "history") {
      displayView = <History budget={this.state.budget} currentWeekNumber={this.state.currentWeekNumber} />
    }

    return (
      <div>
        <Navbar setView={this.setView} currentView={currentView}/>
        {displayView}
      </div>
    )
  }
}
