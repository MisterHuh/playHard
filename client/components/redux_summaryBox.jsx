import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrentData } from '../actions/fetchCurrentData';

class SummaryBox extends React.Component {
  componentDidMount() {
    // console.log("SummaryBox CDM fired");
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

    return (
      <div>

        <h3>Data Retrieved</h3>
        {postItems}

      </div>
    )
  }
}

SummaryBox.propTypes = {
  fetchCurrentData: PropTypes.func.isRequired,
  // current_data:PropTypes.array.isRequired
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
//   currentData:
// }

const mapStateToProps = state => ({
  current_data: state.data.current_data
})

export default connect(
  mapStateToProps,
  { fetchCurrentData }
)(SummaryBox)
