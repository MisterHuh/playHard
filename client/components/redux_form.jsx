import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postData } from '../actions/postData';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // date: new Date(),
      // date: "",
      // category: "Spendings",
      // subCategory: "Food",
      // cc: "Sapphire",
      // amount: "",
      // where: "",
      // notes: "",

      date: "2020-08-09",
      category: "Spendings",
      subCategory: "Food",
      cc: "Sapphire",
      amount: "4.20",
      where: "Pho Lu",
      notes: "test",
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      date: this.state.date,
      category: this.state.category,
      subCategory: this.state.subCategory,
      cc: this.state.cc,
      amount: this.state.amount,
      where: this.state.where,
      notes: this.state.notes
    };

    this.props.postData(post)

    console.log("onSubmit post is: ", post);
  }


  render() {
    return (
      <div>
        <h1>Form</h1>
        <form action="" onSubmit={this.onSubmit}>
          <input type="text" name="date" value={this.state.date} onChange={this.onChange} placeholder="Date" />
          <input type="text" name="category" value={this.state.category} onChange={this.onChange} placeholder="Category" />
          <input type="text" name="subCategory" value={this.state.subCategory} onChange={this.onChange} placeholder="SubCategory" />
          <input type="text" name="cc" value={this.state.cc} onChange={this.onChange} placeholder="Credit Card" />
          <input type="text" name="amount" value={this.state.amount} onChange={this.onChange} placeholder="Amount" />
          <input type="text" name="where" value={this.state.where} onChange={this.onChange} placeholder="Desc" />
          <input type="text" name="notes" value={this.state.notes} onChange={this.onChange} placeholder="Notes" />

          <div>
            <button>Clear</button>
            <button>Submit</button>
          </div>
        </form>

      </div>
    )
  }
}

Form.propTypes = {
  postData: PropTypes.func.isRequired
}

// export default Form;
export default connect(null, {postData})(Form)
