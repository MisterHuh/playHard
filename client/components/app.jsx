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
      budget: 150
    }
    this.setView = this.setView.bind(this);
  }

  setView(view) {
    this.setState({  view  })
  };

  render() {

    let currentView = this.state.view;
    let displayView = null;

    if (currentView === 'add') {
      displayView = <Add setView={this.setView}/>;
    } else if (currentView === "current") {
      displayView = <Current budget={this.state.budget} />
    } else if (currentView === "history") {
      displayView = <History budget={this.state.budget} />
    }

    return (
      <div>
        <Navbar setView={this.setView} currentView={currentView}/>
        {displayView}
      </div>
    )
  }
}
