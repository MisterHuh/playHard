import React from "react";
import Add from "./add";
import Current from "./current";
import { Navbar } from "./navbar";
import History from "./history"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "history",
      budget: 150,
      currentWeekNumber: 1
    }
    this.setView = this.setView.bind(this);
    this.getTotalBudget = this.getTotalBudget.bind(this);
  }

  setView(view) {
    this.setState({  view  })
  };

  getTotalBudget() {

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

  componentDidMount() {
    this.getTotalBudget();
  }

  render() {

    let currentView = this.state.view;
    let displayView = null;

    if (currentView === 'add') {
      displayView = <Add setView={this.setView}/>;
    } else if (currentView === "current") {
      displayView = <Current budget={this.state.budget} currentWeekNumber={this.state.currentWeekNumber}/>
    } else if (currentView === "history") {
      displayView = <History budget={this.state.budget} currentWeekNumber={this.state.currentWeekNumber}/>
    }

    return (
      <div>
        <Navbar setView={this.setView} currentView={currentView}/>
        {displayView}
      </div>
    )
  }
}
