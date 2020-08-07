import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchAllData } from '../actions/fetchAllData';

class SideBox extends Component {
  componentDidMount() {
    console.log("SideBox cmd fired");
    this.props.fetchAllData();
  }

  render() {

    // const { all_data } = this.props.all_data;
    const all_data = this.props.all_data;


    if (all_data.length) {
      return (
        <div>
          <h1>SideBox</h1>
          <div>Date is {all_data[0]['date']}</div>
          <div>Category is {}</div>
          <div>Subcategory is {}</div>
          <div>Credit Card is {}</div>
          <div>Amount is {}</div>
          <div>Description is {}</div>
          <div>Notes is {}</div>
          <div>
            <button>Decrease index</button>
            <button>Incraese index</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h1>SideBox</h1>
          <div>nothing to see here</div>
        </div>
      )
    }


  }
}

const mapStateToProps = (state) => ({
  all_data: state.data.all_data
})

SideBox.propTypes = {
  fetchAllData: PropTypes.func.isRequired,
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

SideBox.defaultProps = {
  all_data: [
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

export default connect(
  mapStateToProps,
  { fetchAllData }
)(SideBox);


// export default SideBox;
