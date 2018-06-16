import React, { Component } from "react";
import "./NetWorthView.css";

import ReactTable from "react-table";
import "react-table/react-table.css";
import CurrencyInput from 'react-currency-input';

class NetWorthView extends Component {

  onCurrencyValueChange(floatValue, cellInfo) {
    let newData = JSON.parse(JSON.stringify(cellInfo.tdProps.rest.data));
    let row = newData[cellInfo.index];
    if (row[cellInfo.column.id] !== floatValue) {
      // console.log('Currency Value change - old val: ', row[cellInfo.column.id], ', new value: ', floatValue);
      row[cellInfo.column.id] = floatValue;
      this.props.onTableDataChange(cellInfo.tdProps.rest.tablename, newData);
    }
  }

  renderEditableCurrencyValue = cellInfo => {
    return (
      <div>
        <CurrencyInput
          prefix='$'
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
    const { assetsCash } = this.props;
    const { assetsLongTerm } = this.props;

    return (
      <div className="App">
        <div>
          <ReactTable
            data={assetsCash}
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
        <hr />
        <div>
          <ReactTable
            data={assetsLongTerm}
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
                Cell: this.renderEditableCurrencyValue
              },
            ]}
            minRows={0}
            showPagination={false}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}

export default NetWorthView;
