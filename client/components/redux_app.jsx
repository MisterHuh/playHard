import React from "react";
import { Navbar } from "./navbar";
import Add from "./add";
import Current from "./current";
// import History from "./history"
import History from './redux_history';

import { Provider } from "react-redux";
import store from "../store";


export default class ReduxApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeekNumber: 1,
      view: "history",
      budget: 150,
      current: [],
    }

    this.setView = this.setView.bind(this);

  }

  setView(view) {
    this.setState({ view })
  };



  componentDidMount() {

  }

  render() {

    return (

      <Provider store={store}>
        <div>
          <Navbar setView={this.setView} />
        </div>
      </Provider>
    )
  }
}
