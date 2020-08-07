import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrentData } from '../actions/fetchCurrentData';

class SummaryBox extends Component {
  componentDidMount() {
    console.log("SummaryBox cmd fired");
    this.props.fetchCurrentData();
  }

  render() {

    const postItems = this.props.current_data.map(entry => (
      <div key={entry.id}>
        <p>{entry.category}</p>
        <p>{entry.amount}</p>
        <hr />
      </div>
    ));

    const spendings = this.props.current_data.reduce(function (acc, val) {
      return val.category == 'Spendings' ? acc + Number(val.amount) : acc;
    }, 0)

    const credits = this.props.current_data.reduce(function (acc, val) {
      return val.category == 'Credits' ? acc + Number(val.amount) : acc;
    }, 0)

    const fixed = this.props.current_data.reduce(function (acc, val) {
      return val.category == 'Fixed' ? acc + Number(val.amount) : acc;
    }, 0)

    const budget = 150.00;
    const remaining = budget - spendings - credits - fixed;


    return (
      <div>

        <div>Total budget is: {budget.toFixed(2)}</div>
        <div>Spendings is: {spendings.toFixed(2)}</div>
        <div>Credits is: {credits.toFixed(2)}</div>
        <div>Fixed is: {fixed.toFixed(2)}</div>
        <div>Remaining is: {remaining.toFixed(2)}</div>

      </div>
    )
  }
}

SummaryBox.propTypes = {
  fetchCurrentData: PropTypes.func.isRequired,
  current_data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    subcategory: PropTypes.string.isRequired,
    cc: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    notes: PropTypes.string
  }))
}

// SummaryBox.defaultProps = {
//   current_Data: [
//     {
//       id: 0,
//       date: "01/01/2020",
//       category: "Spendings",
//       subcategory: "Food",
//       cc: "Sapphire",
//       amount: "4.20",
//       store: "Albertsons",
//       notes: "notes"
//     }
//   ]
// }

const mapStateToProps = state => ({
  current_data: state.data.current_data
})

export default connect(
  mapStateToProps,
  { fetchCurrentData }
)(SummaryBox)
