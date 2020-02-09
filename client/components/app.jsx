import React from "react";
import Add from "./add";
import Current from "./current";
import { Navbar } from "./navbar";
import History from "./history"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "add",
      budget: 150,
      currentWeekNumber: 1,
      current: []
    }
    this.setView = this.setView.bind(this);
    this.getWeekNum = this.getWeekNum.bind(this);
    this.retrieveAllData = this.retrieveAllData.bind(this);
  }

  setView(view) {
    this.setState({  view  })
  };

  getWeekNum() {

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

  retrieveAllData() {
    fetch(`/api/retrieveAllData.php`)
      .then(response => response.json())
      .then(current => {
        this.setState({ current })
        // console.log("APP current is: ", current);
      })
  }

  componentDidMount() {
    this.getWeekNum();
    this.retrieveAllData();
    // console.log("ADD this.state.current is: ", this.state.current);
  }

  render() {

    let currentView = this.state.view;
    let displayView = null;

    if (currentView === 'add') {
      displayView = <Add setView={this.setView} current={this.state.current}/>;
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
