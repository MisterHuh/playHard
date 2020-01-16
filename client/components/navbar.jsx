import React from "react";
import { generateKeyPair } from "crypto";

export const Navbar = props => {

  let currentView = props.currentView;
  let add, current, history;
  if (currentView === "add") {
    add = {
      background: "#999",
      color: "white"
    };
  } else if (currentView === "current") {
    current = {
      background: "#999",
      color: "white"
    };
  } else if (currentView === "history") {
    history = {
      background: "#999",
      color: "white"
    }
  }

  let setView = props.setView;

  return (
      <div className="d-flex flex-row justify-content-center">
      <div
        onClick={() => setView("add")}
        className="navbarButtonContainer"
        style={add}
      >
        <i className="fas fa-plus"></i>
      </div>

      <div
        onClick={() => setView("current")}
        className="navbarButtonContainer"
        style={current}
      >
        <i className="fas fa-check"></i>
      </div>

      <div
        onClick={() => setView("history")}
        className="navbarButtonContainer"
        style={history}
      >
        <i className="fas fa-history"></i>
      </div>

    </div>

  )

}
