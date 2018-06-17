import React, { Component } from "react";
import "./NetWorthView.css";
import getSymbolForCurrency from "./currencyMapper";

import ReactTable from "react-table";
import "react-table/react-table.css";
import CurrencyInput from 'react-currency-input';
import Currency from 'react-currency-formatter';

/**
 * This class takes care of displaying the Net Worth data to the user
 * It contains view-related concerns only
 */
class NetWorthView extends Component {

  onCurrencySelectorChange(event) {
    this.props.onCurrencySelectorChange(event.target.value);
  }

  onCurrencyValueChange(floatValue, cellInfo) {
    // Copy the original prop data to avoid mutating the prop
    // TODO: Is there a more performant way of doing this?
    let newData = JSON.parse(JSON.stringify(cellInfo.tdProps.rest.originaldata));
    let dataItem = newData[cellInfo.row.name];

    // If the value actually changed, notify our listeners.
    if (dataItem[cellInfo.column.id] !== floatValue) {
      dataItem[cellInfo.column.id] = floatValue;
      this.props.onTableDataChange(cellInfo.tdProps.rest.tablename, newData);
    }
  }

  renderEditableCurrencyValue = cellInfo => {
    return (
      <div>
        <CurrencyInput
          prefix={getSymbolForCurrency(this.props.currency)}
          className="editableValue"
          value={cellInfo.value}
          ref={input => {
            if (input) {
              input.theInput.ref = input;
            }
          }}
          onBlur={(event) => {
            this.onCurrencyValueChange(event.target.ref.state.value, cellInfo);
          }}
        />
      </div>
    );
  };

  /**
   * For a given balance sheet type (i.e. assets vs liabilities), renders a table per category.
   * Examples of categories are "Cash and Investments", and "Short Term Liabilities"
   * @param {*} balanceSheetType - 'assets' or 'liabilities'
   * @param {*} balanceSheetData - the data
   */
  renderTablesForBalanceSheetType(balanceSheetType, balanceSheetData) {

    // First, sort the balance sheet items into separate categories for display.
    let categories = [];
    let categorizedData = [];
    Object.keys(balanceSheetData).forEach(itemName => {
      let dataItem = Object.assign({}, balanceSheetData[itemName]); // Copy object to avoid mutating prop
      dataItem.name = itemName;
      if (!categories.includes(dataItem.category)) {
        categories.push(dataItem.category);
        categorizedData[dataItem.category] = [];
      }
      categorizedData[dataItem.category].push(dataItem);
    });

    // Render a table for each category
    let tables = [];
    let categoryCounter = 0;
    for (let category of categories) {
      tables.push(
        <div key={categoryCounter}>
          <ReactTable
            data={categorizedData[category]}
            getTdProps={() => {
              return {
                tablename: balanceSheetType,
                originaldata: balanceSheetData,
              };
            }}
            columns={[
              {
                Header: category,
                accessor: "name",
              },
              {
                Header: 'Monthly Payment',
                accessor: "monthlyPayment",
                show: balanceSheetType === 'liabilities',
                Cell: cell =>
                  <div>
                    <Currency
                      quantity={cell.value}
                      currency={this.props.currency}
                      locale="en_CA"
                    />
                  </div>
              },
              {
                Header: categoryCounter === 0 ? "Interest Rate" : "",
                accessor: "interestRate",
                Cell: cell => <div>{cell.value}%</div>
              },
              {
                accessor: "value",
                Cell: this.renderEditableCurrencyValue
              },
            ]}
            minRows={0}
            showPagination={false}
            className="-striped -highlight"
          />
        </div>
      );
      categoryCounter++;
    }
    return tables;
  }

  render() {
    return (
      <div className="App">
        <h1>Tracking your Net Worth</h1>
        <div>
          <span >Select Currency: </span>
          <select onChange={(event) => {
            this.onCurrencySelectorChange(event)
          }}>
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="calculatedValue">
          <span >Net Worth</span>
          <Currency
            quantity={this.props.netWorth}
            currency={this.props.currency}
            locale="en_CA"
          />
        </div>
        <hr />
        <div>
          <h2 className="sectionHeading">Assets</h2>
        </div>
        {this.renderTablesForBalanceSheetType('assets', this.props.assets)}
        <div className="calculatedValue">
          <span>Total Assets</span>
          <Currency
            quantity={this.props.totalAssets}
            currency={this.props.currency}
            locale="en_CA"
          />
        </div>
        <hr />
        <div>
          <h2 className="sectionHeading">Liabilities</h2>
        </div>
        {this.renderTablesForBalanceSheetType('liabilities', this.props.liabilities)}
        <div className="calculatedValue">
          <span>Total Liabilities</span>
          <Currency
            quantity={this.props.totalLiabilities}
            currency={this.props.currency}
            locale="en_CA"
          />
        </div>
      </div>
    );
  }
}

export default NetWorthView;
