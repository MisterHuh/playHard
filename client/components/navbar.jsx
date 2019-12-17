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
      <div className="navbarButtonContainer border" style={add}>
        <i
          onClick={() => setView("add")}
          className="fas fa-plus"></i>
      </div>
      <div className="navbarButtonContainer border" style={current}>
        <i
          onClick={() => setView("current")}
          className="fas fa-check"></i>
      </div>
      <div className="navbarButtonContainer border" style={history}>
        <i
          onClick={() => setView("history")}
          className="fas fa-history"></i>
      </div>

    </div>

  )

}
