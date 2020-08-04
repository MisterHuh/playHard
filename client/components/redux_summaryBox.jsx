import React from 'react';
import { connect } from 'react-redux';
import { fetchAllData } from '../actions/fetchAllData';

function SummaryBox(props) {
  return (
    <div>
      <div>length is: {props.current.length}</div>
      <div>Total Budget</div>
      <div>Total Spendings</div>
      <div>Total Credits</div>
      <div>Total Fixed</div>
      <div>Total Remaining</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    current: state.current
  }
}

// export default SummaryBox;
export default connect(
  mapStateToProps,
  { fetchAllData }
)(SummaryBox)
