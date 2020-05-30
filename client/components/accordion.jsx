import React from "react";
import { TotalSummary, CurrencyFormatter, AccordionColor } from "./helperFunctions"

export const Accordion = props => {

  let header = props.header;
  let accordionColor = AccordionColor(header);

  const remainingHeaders = [
    "Food", "Home", "Gifts", "Travel", "Ent", "Dog"
  ];

  let week = props.week;

  let current = props.current;
  let budget;

  (week.currentWeekNumber)
    ? budget = 150 * week.currentWeekNumber
    : budget = 150 * week.queryWeekNumber;

  let totalSummary = TotalSummary(week, current, budget);

  let category = props.category;
  console.log("accordion category is: ", category);

  // if (header === "Total Fixed") {
  //   console.log("accordion totalFixed is: ", category);
  // };

  if (category) {
    return (
      <div className={"accordionContainer " + accordionColor}>

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
      <div className={"accordionContainer " + accordionColor}>

        <table>
          <tbody>

            <tr className={accordionColor}>
              <th colSpan="2" >{props.header}</th>
              <td colSpan="2" >{CurrencyFormatter.format(category.total)}</td>
            </tr>

            <tr className={accordionColor}>
              <th>{remainingHeaders[0]}</th>
              <td>{CurrencyFormatter.format(category.groceries)}</td>
              <th>{remainingHeaders[1]}</th>
              <td>{CurrencyFormatter.format(category.gas)}</td>
            </tr>

            <tr className={accordionColor}>
              <th>{remainingHeaders[2]}</th>
              <td>{CurrencyFormatter.format(category.fixedEtc)}</td>
              <th>{remainingHeaders[3]}</th>
              <td>{CurrencyFormatter.format(category.fixedEtc)}</td>
            </tr>

            <tr className={accordionColor}>
              <th>{remainingHeaders[4]}</th>
              <td>{CurrencyFormatter.format(category.fixedEtc)}</td>
              <th>{remainingHeaders[5]}</th>
              <td>{CurrencyFormatter.format(category.fixedEtc)}</td>
            </tr>

          </tbody>
        </table>

      </div>
    )
  }


}
