import React from "react";
import { CurrencyFormatter, AccordionColor } from "./helperFunctions"

export const Accordion = props => {

  let header = props.header;
  let accordionColor = AccordionColor(header);

  const remainingHeaders = [
    "Food", "Home", "Gifts", "Travel", "Ent", "Dog"
  ];

  const fixedHeaders = [
    "Groceries", "Gas", "Health", "Utility"
  ]

  let week = props.week;

  let current = props.current;
  let budget;

  (week.currentWeekNumber)
    ? budget = 150 * week.currentWeekNumber
    : budget = 150 * week.queryWeekNumber;

  let category = props.category;

  if ( category &&  (header === "Total Spendings" || header === "Total Credits") ) {
    return (
      <div className="accordionContainer">

        <table>
          <tbody>

            <tr className={accordionColor}>
              <th colSpan="2" >{props.header}</th>
              <td colSpan="2" >{CurrencyFormatter.format(category.total)}</td>
            </tr>

            <tr className={accordionColor}>
              <th>{remainingHeaders[0]}</th>
              <td>{CurrencyFormatter.format(category.food)}</td>
              <th>{remainingHeaders[1]}</th>
              <td>{CurrencyFormatter.format(category.home)}</td>
            </tr>

            <tr className={accordionColor}>
              <th>{remainingHeaders[2]}</th>
              <td>{CurrencyFormatter.format(category.gifts)}</td>
              <th>{remainingHeaders[3]}</th>
              <td>{CurrencyFormatter.format(category.travel)}</td>
            </tr>

            <tr className={accordionColor}>
              <th>{remainingHeaders[4]}</th>
              <td>{CurrencyFormatter.format(category.entertainment)}</td>
              <th>{remainingHeaders[5]}</th>
              <td>{CurrencyFormatter.format(category.dogs)}</td>
            </tr>

          </tbody>
        </table>

      </div>
    )
  } else if (category && header === "Total Fixed") {

    return (

      <div className={"accordionContainer"}>

        <table>
          <tbody>

            <tr className={accordionColor}>
              <th colSpan="2" >{props.header}</th>
              <td colSpan="2" >{CurrencyFormatter.format(category.total)}</td>
            </tr>

            <tr className={accordionColor}>
              <th>{fixedHeaders[0]}</th>
              <td>{CurrencyFormatter.format(category.groceries)}</td>
              <th>{fixedHeaders[1]}</th>
              <td>{CurrencyFormatter.format(category.gas)}</td>
            </tr>

            <tr className={accordionColor}>
              <th>{fixedHeaders[2]}</th>
              <td>{CurrencyFormatter.format(category.fixedEtc)}</td>
              <th>{fixedHeaders[3]}</th>
              <td>{CurrencyFormatter.format(category.fixedEtc)}</td>
            </tr>

          </tbody>
        </table>

      </div>
    )
  }


}
