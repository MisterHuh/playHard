import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllData } from '../actions/fetchAllData';

class SummaryBox extends React.Component {
  componentDidMount() {
    this.props.fetchAllData();
  }

  render() {

    const postItems = this.props.all_data.map(entry => (
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
  fetchAllData:PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
  all_data: state.data.all_data,

})

export default connect(
  mapStateToProps,
  { fetchAllData }
)(SummaryBox)
