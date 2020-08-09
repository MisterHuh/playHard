import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchAllData } from '../actions/fetchAllData';
import { previousEntry } from '../actions/counter';

class SideBox extends Component {
  componentDidMount() {
    console.log("SideBox cmd fired");
    this.props.fetchAllData();
  }

  render() {

    // const { all_data } = this.props.all_data;
    const all_data = this.props.all_data;
    const current_index = this.props.current_index;


    if (all_data.length) {
      return (
        <div>
          <h1>SideBox</h1>
          <div>Date is {all_data[current_index]['date']}</div>
          <div>Category is {all_data[current_index]['category']}</div>
          <div>Subcategory is {all_data[current_index]['subcategory']}</div>
          <div>Credit Card is {all_data[current_index]['cc']}</div>
          <div>Amount is {all_data[current_index]['amount']}</div>
          <div>Description is {all_data[current_index]['store']}</div>
          <div>Notes is {all_data[current_index]['notes']}</div>
          <div>current index is {current_index}</div>
          <div>
            <button onClick={this.props.previousEntry}>Decrease index</button>
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
  all_data: state.data.all_data,
  current_index: state.data.current_index
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
  })),
  current_index: PropTypes.number.isRequired
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
  { fetchAllData, previousEntry }
)(SideBox);


// export default SideBox;
