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

  onCurrencyValueChange(floatValue, cellInfo) {
    let newData = JSON.parse(JSON.stringify(cellInfo.tdProps.rest.data));
    let row = newData[cellInfo.index];
    if (row[cellInfo.column.id] !== floatValue) {
      row[cellInfo.column.id] = floatValue;
      this.props.onTableDataChange(cellInfo.tdProps.rest.tablename, newData);
    }
  }

  onCurrencySelectorChange(event) {
    this.props.onCurrencySelectorChange(event.target.value);
  }

  renderEditableCurrencyValue = cellInfo => {
    return (
      <div>
        <CurrencyInput
          prefix={getSymbolForCurrency(this.props.currency)}
          className="editableValue"
          value={cellInfo.tdProps.rest.data[cellInfo.index][cellInfo.column.id]}
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
        <div>
          <ReactTable
            data={this.props.assetsCash}
            getTdProps={() => {
              return {
                tablename: 'assetsCash',
                data: this.props.assetsCash,
              };
            }}
            columns={[
              {
                Header: "Cash and Investments",
                accessor: "name",
              },
              {
                Header: "Interest Rate",
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
        <div>
          <ReactTable
            data={this.props.assetsLongTerm}
            getTdProps={() => {
              return {
                tablename: 'assetsLongTerm',
                data: this.props.assetsLongTerm,
              };
            }}
            columns={[
              {
                Header: "Long Term Assets",
                accessor: "name",
              },
              {
                accessor: "interestRate",
                Cell: cell => <div>{cell.value}%</div>
              },
              {
                accessor: "value",
                Cell: this.renderEditableCurrencyValue,
              },
            ]}
            minRows={0}
            showPagination={false}
            className="-striped -highlight"
          />
        </div>
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
        <div>
          <ReactTable
            data={this.props.liabilitiesShortTerm}
            getTdProps={() => {
              return {
                tablename: 'liabilitiesShortTerm',
                data: this.props.liabilitiesShortTerm,
              };
            }}
            columns={[
              {
                Header: "Short Term Liabilities",
                accessor: "name",
              },
              {
                Header: 'Monthly Payment',
                accessor: "monthlyPayment",
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
                Header: 'Interest Rate',
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
        <div>
          <ReactTable
            data={this.props.liabilitiesLongTerm}
            getTdProps={() => {
              return {
                tablename: 'liabilitiesLongTerm',
                data: this.props.liabilitiesLongTerm,
              };
            }}
            columns={[
              {
                Header: "Long Term Debt",
                accessor: "name",
              },
              {
                accessor: "monthlyPayment",
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
