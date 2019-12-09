import React from "react";
import { generateKeyPair } from "crypto";

export const Navbar = props => {

  let currentView = props.currentView;
  let addBackfill, currentBackfill, historyBackfill;

  if (currentView = "add") {
    addBackfill = {
      backgroundColor: "#96D1E3",
      color: "white"
    };
    currentBackfill = {
      backgroundColor: "white"
    };
    historyBackfill = {
      backgroundColor: "white"
    };
  }

  let setView = props.setView;

  return (

    <div className="d-flex flex-row justify-content-center">
      <div className="navbarButtonContainer border" style={addBackfill}>
        <i
          onClick={() => setView("add")}
          className="fas fa-plus"></i>
      </div>
      <div className="navbarButtonContainer border" style={currentBackfill}>
        <i
          onClick={() => setView("current")}
          className="fas fa-check"></i>
      </div>
      <div className="navbarButtonContainer border" style={historyBackfill}>
        <i
          onClick={() => setView("history")}
          className="fas fa-history"></i>
      </div>

    </div>

  )

}
