import React from "react";
import { generateKeyPair } from "crypto";

export const Navbar = props => {

  let currentView = props.currentView;
  let add, current, history;

  // if (currentView === "add") {
  //   add = {
  //     background: "rgba(195, 187, 187)",
  //   };
  // } else if (currentView === "current") {
  //   current = {
  //     background: "rgba(195, 187, 187)",
  //   };
  // } else if (currentView === "history") {
  //   history = {
  //     background: "rgba(195, 187, 187)",
  //   }
  // }

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
