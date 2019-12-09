import React from "react";
import Add from "./add";
import { Chargers } from "./chargers";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "add"
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
    }

    return (
      <div>
        <Chargers setView={this.setView}/>
        {displayView}
      </div>
    )
  }
}
