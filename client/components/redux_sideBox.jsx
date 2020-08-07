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
    return (
      <div>SideBox</div>
    )
  }
}

const mapStateToProps = (state) => ({
  all_data: state.data.all_data
})

export default connect (
  mapStateToProps,
  { fetchAllData }
)(SideBox);


// export default SideBox;
