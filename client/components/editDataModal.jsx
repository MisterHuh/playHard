import React from "react";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from "react-dropdown";
import 'react-dropdown/style.css'
import TestUtils from "react-addons-test-utils";

export const EditDataModal = props => {
  let entry = props.entry;
  let modalStatus = props.editModal;

  const dropdownOptions = [ // CC
    { value: 'AmEx', label: 'AmEx' },
    { value: 'Freedom', label: 'Freedom' },
    { value: 'Sapphire', label: 'Sapphire' },
    { value: 'Venmo', label: 'Venmo' },
    { value: 'BankAmericard', label: 'BankAmericard' },
    { value: 'BetterBalance', label: 'BetterBalance' }
  ];

  const dropdownOptions1 = [
    // subCategory - default / spendings
    { value: 'Food', label: 'Food' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Gas', label: 'Gas' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Gifts', label: 'Gifts' },
    { value: 'Home', label: 'Home' },
    { value: 'Dogs', label: 'Dogs' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Emergency', label: 'Emergency' },
    { value: 'Utility', label: 'Utility' },
    { value: 'Health', label: 'Health' },
    { value: 'Automobile', label: 'Automobile' }
  ];

  console.log("EditDataModal entry is: ", entry);
  console.log("EditDataModal entry.d is: ", entry.id);
  console.log("modalStatus is: ", modalStatus);

  if (modalStatus) {
    return (
      <div className="editDataModalContainer addForm centered">
        {/* date */}
        <div className="mx-4 addFormSpacing">

          <div className="formValidationContainer"></div>
          <DatePicker
            // selected={this.state.date}
            // onChange={this.dateHandleChange}
            className="amount"
          />
        </div>

        {/* category */}
        <div className="mx-4 addInput">
          <div className="formValidationContainer"></div>

          {/* category */}
          <div className="catButtonContainer">
            <div id="Spendings" className="catButton" value="Spendings">Spendings</div>
            <div id="Fixed" className="catButton" value="Fixed">Fixed</div>
            <div id="Credits" className="catButton" value="Credits">Credits</div>
            <div id="Vacation" className="catButton" value="Vacation">Vacation</div>
            <div id="Wedding" className="catButton" value="Wedding">Wedding</div>
          </div>
        </div>

        {/* subCategory */}
        <div className="mx-4 addInput">
          <div className="formValidationContainer"></div>
          <Dropdown
            // onChange={this.subCategoryHandleChange}
            options={dropdownOptions1}
            // options={subcatDropdown}
            arrowClosed={<span className="arrow-closed" />}
            arrowOpen={<span className="arrow-open" />}
            // placeholder={this.state.subCategory}
            className=""
          />
        </div>

        {/* CC */}
        <div className="mx-4 addInput">
          <div className="formValidationContainer"></div>

          <div className="catButtonContainer">
            <div id="Sapphire" className="catButton">Sapphire</div>
            <div id="AmEx" className="catButton">AmEx</div>
            <div id="Venmo" className="catButton" >Venmo</div>
            <div id="Freedom" className="catButton" >Freedom</div>
            <div id="BB" className="catButton" >BB</div>
          </div>
        </div>

        {/* amount */}
        <div className="mx-4 addInput test">

          <div className="formValidationContainer">
            {/* <div className="textFadeOutContainer">
              {this.state.formErrors.amount.length > 0 && (
                <div className="textFadeOut ">{this.state.formErrors.amount}</div>
              )}
            </div> */}
          </div>

          <input
            // id={shakeIt_amount}
            type="number"
            // value={this.state.amount}
            // onChange={this.inputHandleChange}
            placeholder="$ 00.00"
            name="amount"
            className="amount"
          />
        </div>

        {/* where */}
        <div className="mx-4 addInput test">

          <div className="formValidationContainer">
            {/* <div className="textFadeOutContainer">
              {this.state.formErrors.where.length > 0 && (
                <div className="textFadeOut">{this.state.formErrors.where}</div>
              )}
            </div> */}
          </div>

          <input
            // id={shakeIt_where}
            // value={this.state.where}
            // onChange={this.inputHandleChange}
            placeholder="Where?"
            name="where"
            // className={"amount " + shakeIt_where}
            className="amount"
          />
        </div>

        {/* notes */}
        <div className="mx-4 addInput">
          <div className="formValidationContainer"></div>
          <input
            // value={this.state.notes}
            // onChange={this.inputHandleChange}
            placeholder="Notes"
            name="notes"
            className="amount "
          />
        </div>

        {/* button */}
        <div className="mx-4 addInput">
          <div className="formValidationContainer"></div>
          <div
            // onClick={() => this.handleSubmit()}
            className={"addButton text-center "}
            > Edit
              </div>
        </div>

      </div>

    )
  } else {
    return null;
  }
}
