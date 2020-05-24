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
// import { CurrencyFormatter } from "./currencyFormatter";
import { TotalSummary, CurrencyFormatter } from "./helperFunctions"

export const Accordion = props => {
  let header = props.header;
  let content = props.content;

  return (
    <div className="accordionContainer">
      <h2>{props.header}</h2>
      <div className="accordionBody">Total Spendings</div>
      <div className="accordionBody">{content.total}</div>
      {/* <div className="accordionBody">{totalFoodSpendings}</div>
      <div className="accordionBody">{totalHomeSpendings}</div>
      <div className="accordionBody">{totalGiftSpendings}</div>
      <div className="accordionBody">{totaltravelSpendings}</div>
      <div className="accordionBody">{totalEntertainmentSpendings}</div>
      <div className="accordionBody">{totalDogSpendings}</div> */}
    </div>
  )
}
