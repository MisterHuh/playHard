import React, { Component } from 'react';
import { previousEntry } from '../actions/counter';
import { connect } from 'react-redux';

class SideBoxButtons extends Component {
  render() {
    return(
      <div>
        <button onClick={this.props.previousEntry}>Decrease index</button>
        <button>Incraese index</button>
      </div>
    )
  }
}

export default connect(null, { previousEntry } )(SideBoxButtons);
