import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrentData } from '../actions/fetchCurrentData';

class SummaryBox extends React.Component {
  componentDidMount() {
    // console.log("SummaryBox CDM fired");
    this.props.fetchCurrentData();
  }

  calculateTotal(array, filter) {
    array.reduce(function (acc, val) {
      return val.category == filter ? acc + Number(val.amount) : acc;
    }, 0)
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

    // const spendings = calculateTotal(this.props.current_data, 'Spendings');

    return (
      <div>

        <h1>Spendings is: {spendings.toFixed(2)}</h1>
        <h1>Credits is: {credits.toFixed(2)}</h1>
        <h1>Fixed is: {fixed.toFixed(2)}</h1>
        <hr />
        <h3>Data Retrieved</h3>
        {postItems}


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

SummaryBox.defaultProps = {
  current_Data: [
    {
      id: 0,
      date: "01/01/2020",
      category: "Spendings",
      subcategory: "Food",
      cc: "Sapphire",
      amount: "4.20",
      store: "Albertsons",
      notes: "notes"
    }
  ]
}

const mapStateToProps = state => ({
  current_data: state.data.current_data
})

export default connect(
  mapStateToProps,
  { fetchCurrentData }
)(SummaryBox)
