import React from "react";
import { CurrencyFormatter } from "./currencyFormatter";

export const RenderData = props => {
  let entry = props.entry;

  let creditsFontColor = entry["amount"] < 0 ? "creditsFontColor" : null;
  // console.log("entry is: ", entry);
  // console.log("testRenderData fired");
  if (entry) {
    // console.log("props.current is truthy");
    return (
      <div className={"currentData"} >
        <div className={"currentDataHeader renderDataHover " + entry["category"].toLowerCase()}>

          <div className="iconContainer ">
            <i key={entry["id"]} onClick={() => props.deleteEntry(entry["id"])} className="icon fas fa-times"></i>
          </div>

          <div className="iconContainer ">
            <i className="icon fas fa-edit"></i>
          </div>

          <div>
            <div className="">{entry["date"]}</div>
          </div>

        </div>
        <div
          onClick={props.deleteEntry}
          className={"currentDataHeader " + entry["category"].toLowerCase()}>{entry["subcategory"]}</div>

        <div className={"currentDataHeader " + entry["category"].toLowerCase()}>{entry["cc"]}</div>
        <div className={"currentDataHeader " + entry["category"].toLowerCase() + " " + creditsFontColor}>{CurrencyFormatter.format(entry["amount"])}</div>
        <div className={"currentDataHeader " + entry["category"].toLowerCase()}>{entry["store"]}</div>
        <div className={"currentDataHeader " + entry["category"].toLowerCase()}>{entry["notes"]}</div>

      </div>
    )
  } else {
    console.log("props.current is falsey");
    return (
      <div key={entry["id"]}>Test</div>
    )
  }


  // return (

  //   <div>

  //     {props.current.map(entry => {

  //       let creditsFontColor = entry.amount < 0 ? "creditsFontColor" : null;

  //       return (

  //         <div key={entry.id} className={"currentData"} >
  //           <div className={"currentDataHeader renderDataHover " + entry.category.toLowerCase()}>

  //             <div className="iconContainer ">
  //               <i key={entry.id} onClick={props.deleteEntry} className="icon fas fa-times"></i>
  //             </div>

  //             <div className="iconContainer ">
  //               <i className="icon fas fa-edit"></i>
  //             </div>

  //             <div>
  //               <div className="">{entry.date}</div>
  //             </div>

  //           </div>
  //           <div
  //             onClick={props.deleteEntry}
  //             className={"currentDataHeader " + entry.category.toLowerCase()}>{entry.subcategory}</div>

  //           <div className={"currentDataHeader " + entry.category.toLowerCase()}>{entry.cc}</div>
  //           <div className={"currentDataHeader " + entry.category.toLowerCase() + " " + creditsFontColor}>{CurrencyFormatter.format(entry.amount)}</div>
  //           <div className={"currentDataHeader " + entry.category.toLowerCase()}>{entry.store}</div>
  //           <div className={"currentDataHeader " + entry.category.toLowerCase()}>{entry.notes}</div>

  //         </div>
  //       )
  //     })

  //     }

  //   </div>

  // ) /* closing bracket on main return */

}
