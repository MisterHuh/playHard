import React from "react";
import Add from "./add";
import Current from "./current";
import { Navbar } from "./navbar";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "current"
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
      displayView = <Current />
    }

    // console.log("currentView is: ", currentView)
    return (
      <div>
        <Navbar setView={this.setView} currentView={currentView}/>
        {displayView}
      </div>
    )
  }
}
