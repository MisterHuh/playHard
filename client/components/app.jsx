import React from "react";
import Add from "./add";

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
    return (
      <Add setView={this.setView} />
    )
  }
}
