// delete or keep?

// export default class Accordion extends React.Component {
//   constructor() {
//     super();
//     this._handleClick = this._handleClick.bind(this);
//   }

//   componentDidMount() {
//     this._handleClick();
//   }

//   _handleClick() {
//     const acc = this._acc.children;
//     for (let i = 0; i < acc.length; i++) {
//       let a = acc[i];
//       a.onclick = () => a.classList.toggle("active");
//     }
//   }

//   render() {
//     return (
//       <div
//         ref={a => this._acc = a}
//         onClick={this._handleClick}>
//         {this.props.children}
//       </div>
//     )
//   }
// }

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <Accordion>
//           <div className="accor">
//             <div className="head">Head 1</div>
//             <div className="body">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//             </div>
//           </div>
//           <div className="accor">
//             <div className="head">Head 2</div>
//             <div className="body">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//             </div>
//           </div>
//         </Accordion>
//       </div>
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById('root'));

import React from "react";
import { TotalSummary, CurrencyFormatter } from "./helperFunctions"

export const Accordion = props => {

  let header = props.header;
  const remainingHeaders = [
    "Food", "Home", "Gifts", "Travel", "Ent", "Dog"
  ];

  let content = props.content;
  let week = props.week;

  let current = props.current;
  let budget;

  // console.log("Accordion week.currentWeekNumber; is: ", week.currentWeekNumber);
  // console.log("Accordion week.queryWeekNumber; is: ", week.queryWeekNumber);

  if (week.currentWeekNumber) {
    budget = 150 * week.currentWeekNumber;
  } else if (week.queryWeekNumber) {
    budget = 150 * week.queryWeekNumber;
  }

  console.log("Accordion budget is: ", budget);

  let totalSummary = TotalSummary(week, current, budget);
  console.log("totalSummary is: ", totalSummary);
  // console.log("totalSummary.others.budget is: ", totalSummary.others.budget);

  return (
    <div className="accordionContainer toggleDisplaySpendings spendings">
      {/* <div>{props.header}</div> */}
      {/* <div className="accordionBody">{CurrencyFormatter.format(totalSummary.spendings.totalSpendings)}</div> */}

      <tr className="toggleDisplaySpendings spendings">
        <th>{props.header}</th>
        <td>{CurrencyFormatter.format(totalSummary.spendings.totalSpendings)}</td>
      </tr>

      <tr className=" spendings">
        <th>{remainingHeaders[0]}</th>
        <td>{CurrencyFormatter.format(totalSummary.spendings.totalFoodSpendings)}</td>
        <th>{remainingHeaders[1]}</th>
        <td>{CurrencyFormatter.format(totalSummary.spendings.totalHomeSpendings)}</td>
      </tr>

      <tr className=" spendings">
        <th>{remainingHeaders[2]}</th>
        <td>{CurrencyFormatter.format(totalSummary.spendings.totalGiftsSpendings)}</td>
        <th>{remainingHeaders[3]}</th>
        <td>{CurrencyFormatter.format(totalSummary.spendings.totalTravelSpendings)}</td>
      </tr>

      <tr className=" spendings">
        <th>{remainingHeaders[4]}</th>
        <td>{CurrencyFormatter.format(totalSummary.spendings.totalEntertainmentSpendings)}</td>
        <th>{remainingHeaders[5]}</th>
        <td>{CurrencyFormatter.format(totalSummary.spendings.totalDogSpendings)}</td>
      </tr>

      {/* <tr className=" ">
        <th colSpan="2">Total Spendings</th>
        <td colSpan="2">{CurrencyFormatter.format(this.state.totalSpendings)}</td>
      </tr> */}

      {/* <div>{remainingHeaders[0]}</div>
      <div className="accordionBody">{CurrencyFormatter.format(totalSummary.spendings.totalFoodSpendings)}</div>

      <div>{remainingHeaders[1]}</div>
      <div className="accordionBody">{CurrencyFormatter.format(totalSummary.spendings.totalGiftsSpendings)}</div>

      <div>{remainingHeaders[3]}</div>
      <div className="accordionBody">{CurrencyFormatter.format(totalSummary.spendings.totalEntertainmentSpendings)}</div> */}

    </div>
  )
}
