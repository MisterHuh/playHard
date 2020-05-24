import React from "react";

export const CurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

export const TotalSummary = (week) => {
  // let week = week;
  let weekNumber = "test";
  let test = week.currentWeekNumber;
  console.log("test is: ", test);

  // (week.currentWeekNumber)
  //   ? weekNumber = week.currentWeekNumber
  //   : weekNumber = week.queryWeekNumber;

  // alert(week);
  alert(weekNumber);

}
