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

  return (
    <div className={"accordionContainer " + accordionColor}>

      <table>
        <tbody>

          <tr className={accordionColor}>
            <th colSpan="2" >{props.header}</th>
            <td colSpan="2" >{CurrencyFormatter.format(totalSummary.spendings.totalSpendings)}</td>
          </tr>

          <tr className={accordionColor}>
            <th>{remainingHeaders[0]}</th>
            <td>{CurrencyFormatter.format(totalSummary.spendings.totalFoodSpendings)}</td>
            <th>{remainingHeaders[1]}</th>
            <td>{CurrencyFormatter.format(totalSummary.spendings.totalHomeSpendings)}</td>
          </tr>

          <tr className={accordionColor}>
            <th>{remainingHeaders[2]}</th>
            <td>{CurrencyFormatter.format(totalSummary.spendings.totalGiftsSpendings)}</td>
            <th>{remainingHeaders[3]}</th>
            <td>{CurrencyFormatter.format(totalSummary.spendings.totalTravelSpendings)}</td>
          </tr>

          <tr className={accordionColor}>
            <th>{remainingHeaders[4]}</th>
            <td>{CurrencyFormatter.format(totalSummary.spendings.totalEntertainmentSpendings)}</td>
            <th>{remainingHeaders[5]}</th>
            <td>{CurrencyFormatter.format(totalSummary.spendings.totalDogSpendings)}</td>
          </tr>

          <tr className={accordionColor}>
            <th>Total Remaining</th>
            <td>{CurrencyFormatter.format(totalSummary.others.totalRemaining)}</td>
            <th>Budget</th>
            <td>{CurrencyFormatter.format(totalSummary.others.budget)}</td>
          </tr>

        </tbody>
      </table>

    </div>
  )
}
