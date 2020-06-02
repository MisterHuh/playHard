import React from "react";

export const CurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export const GetCurrentWeekNum = () => {

  console.log("helperFunctions GetCurrentWeekNum fired");

  let timestamp = new Date();
  let sundayChecker = timestamp.getDay();
  let currentWeek = require("current-week-number");
  let currentWeekNum;

  if (sundayChecker === 0) {
    let followingDay = new Date(timestamp.getTime() + 86400000);
    currentWeekNum = currentWeek(followingDay);
  } else {
    currentWeekNum = currentWeek(timestamp);
  }

  return currentWeekNum;
}

/* for TotalSummary, budget is Total Budget */
/* for some reason, week is needed as an argument for this to work */
export const TotalSummary = (week, current, budget) => {

    let totalSpendings = 0;
    let totalFoodSpendings = 0;
    let totalHomeSpendings = 0;
    let totalGiftsSpendings = 0;
    let totalTravelSpendings = 0;
    let totalEntertainmentSpendings = 0;
    let totalDogSpendings = 0;

    let spendingsFoodPercent = 0;
    let spendingsHomePercent = 0;
    let spendingsGiftPercent = 0;
    let spendingsTravelPercent = 0;
    let totalEntertainmentPercent = 0;
    let spendingsDogPercent = 0;

    let totalCredits = 0;
    let totalFoodCredits = 0;
    let totalHomeCredits = 0;
    let totalGiftsCredits = 0;
    let totalTravelCredits = 0;
    let totalEntertainmentCredits = 0;
    let totalDogCredits = 0;

    let creditsFoodPercent = 0;
    let creditsHomePercent = 0;
    let creditsGiftPercent = 0;
    let creditsTravelPercent = 0;
    let creditsEntertainmentPercent = 0;
    let creditsDogPercent = 0;

    let totalRemaining = 0;

    let totalFixed = 0;
    let totalGroceries = 0;
    let totalGas = 0;
    let totalFixedEtc = 0;

    // console.log("TotalSummary current is: ", current);
    // console.log("TotalSummary current.length is: ", current.length);
    // console.log("TotalSummary current[0] is: ", current[0]);

    for (let index = 0; index < current.length; index++) {
      if (current[index]["category"] === "Spendings") {
        totalSpendings += parseFloat(current[index]["amount"]);

        if (current[index]["subcategory"] === "Food") {
          totalFoodSpendings += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Home") {
          totalHomeSpendings += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Gifts") {
          totalGiftsSpendings += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Travel") {
          totalTravelSpendings += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Entertainment") {
          totalEntertainmentSpendings += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Dogs") {
          totalDogSpendings += parseFloat(current[index]["amount"]);
        };

      } else if (current[index]["category"] === "Credits") {
        totalCredits += parseFloat(current[index]["amount"]);

        if (current[index]["subcategory"] === "Food") {
          totalFoodCredits += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Home") {
          totalHomeCredits += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Gifts") {
          totalGiftsCredits += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Travel") {
          totalTravelCredits += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Entertainment") {
          totalEntertainmentCredits += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Dogs") {
          totalDogCredits += parseFloat(current[index]["amount"]);
        };

      } else if (current[index]["category"] === "Fixed") {

        if (current[index]["subcategory"] === "Groceries") {
          totalGroceries += parseFloat(current[index]["amount"]);

        };

        if (current[index]["subcategory"] === "Gas") {
          totalGas += parseFloat(current[index]["amount"]);
        };

        if (current[index]["subcategory"] === "Utility" || current[index]["subcategory"] === "Health" || current[index]["subcategory"] === "Entertainment") {
          totalFixedEtc += parseFloat(current[index]["amount"]);
        };
        totalFixed += parseFloat(current[index]["amount"]);
      }
    }

    totalSpendings = totalSpendings.toFixed(2);
    spendingsFoodPercent = ((totalFoodSpendings / totalSpendings) * 100).toFixed();
    spendingsHomePercent = ((totalHomeSpendings / totalSpendings) * 100).toFixed();
    spendingsGiftPercent = ((totalGiftsSpendings / totalSpendings) * 100).toFixed();
    spendingsTravelPercent = ((totalTravelSpendings / totalSpendings) * 100).toFixed();
    totalEntertainmentPercent = ((totalEntertainmentSpendings / totalSpendings) * 100).toFixed();
    spendingsDogPercent = ((totalDogSpendings / totalSpendings) * 100).toFixed();

    totalCredits = totalCredits.toFixed(2);
    creditsFoodPercent = ((totalFoodCredits / totalCredits) * 100).toFixed();
    creditsHomePercent = ((totalHomeCredits / totalCredits) * 100).toFixed();
    creditsGiftPercent = ((totalGiftsCredits / totalCredits) * 100).toFixed();
    creditsTravelPercent = ((totalTravelCredits / totalCredits) * 100).toFixed();
    creditsEntertainmentPercent = ((totalEntertainmentCredits / totalCredits) * 100).toFixed();
    creditsDogPercent = ((totalDogCredits / totalCredits) * 100).toFixed();

    totalFixed = totalFixed.toFixed(2);
    totalRemaining = budget - totalCredits - totalSpendings;

    let totalSummary = {
      spendings: {
        totalSpendings,
        totalFoodSpendings,
        totalHomeSpendings,
        totalGiftsSpendings,
        totalTravelSpendings,
        totalEntertainmentSpendings,
        totalDogSpendings
      },
      credits: {
        totalCredits,
        totalFoodCredits,
        totalHomeCredits,
        totalGiftsCredits,
        totalTravelCredits,
        totalEntertainmentCredits,
        totalDogCredits
      },
      fixed: {
        totalFixed,
        totalGroceries,
        totalGas,
        totalFixedEtc
      },
      others: {
        totalRemaining,
        budget
      }
    };

    return totalSummary;

}

export const AccordionColor = (header) => {
  let accordionColor;

  if (header === "Total Spendings") {
    return accordionColor = "toggleDisplaySpendings spendings";
  } else if (header === "Total Credits") {
    return accordionColor = "totalDisplayCredits credits";
  } else if (header === "Total Fixed") {
    return accordionColor = "totalDisplayFixed fixed";
  }
}

export const SetWeek = (currentWeekNumber) => {
  console.log("helperFunction setWeek fired");
  this.setState({
    week: {
      currentWeekNumber,
      queryWeekNumber: 0
    }
  });
}
