import React from "react";
import { generateKeyPair } from "crypto";

export const Navbar = props => {

  let currentView = props.currentView;
  let addBackfill, currentBackfill, historyBackfill;

  if (currentView = "add") {
    addBackfill = {
      backgroundColor: "grey"
    };
    currentBackfill = {
      backgroundColor: "white"
    };
    historyBackfill = {
      backgroundColor: "white"
    };
  }

  return (

    <div className="d-flex flex-row justify-content-center">
      <div className="navbarButtonContainer border" style={addBackfill}>
        <i className="fas fa-plus"></i>
      </div>
      <div className="navbarButtonContainer border" style={currentBackfill}>
        <i className="fas fa-check"></i>
      </div>
      <div className="navbarButtonContainer border" style={historyBackfill}>
        <i className="fas fa-history"></i>
      </div>

    </div>

  )

}
