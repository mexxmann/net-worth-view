import React, { Component } from "react";
import "./NetWorthView.css";

import ReactTable from "react-table";
import "react-table/react-table.css";
import CurrencyInput from 'react-currency-input';

class NetWorthView extends Component {

  // onTableDataChange(tableName, data) {
  //   this.props.onTableDataChange(tableName, data);
  // }

  onCurrencyValueChange(floatValue, cellInfo) {
    let newData = JSON.parse(JSON.stringify(cellInfo.tdProps.rest.data));
    let row = newData[cellInfo.index];
    if (row[cellInfo.column.id] !== floatValue) {
      row[cellInfo.column.id] = floatValue;
      this.props.onTableDataChange(cellInfo.tdProps.rest.tablename, newData);
    }
  }

  toCurrency(numberString) {
    let number = parseFloat(numberString);
    return number.toLocaleString('USD');
  }

  renderEditableCurrencyValue = cellInfo => {
    return (
      <div>
        {/* <span>$</span>
        <span
          style={{ backgroundColor: "#fafafa" }}
          contentEditable
          suppressContentEditableWarning
          onBlur={e => {
            let newData = JSON.parse(JSON.stringify(cellInfo.tdProps.rest.data));
            let row = newData[cellInfo.index];
            if (row[cellInfo.column.id] !== e.target.innerHTML) {
              row[cellInfo.column.id] = e.target.innerHTML;
              this.onTableDataChange(cellInfo.tdProps.rest.tablename, newData);
            }
          }}
          dangerouslySetInnerHTML={{
            __html: cellInfo.tdProps.rest.data[cellInfo.index][cellInfo.column.id]
          }}
        /> */}
        <CurrencyInput
          prefix='$'
          value={cellInfo.tdProps.rest.data[cellInfo.index][cellInfo.column.id]}
          onChangeEvent={(event, maskedValue, floatValue) => {
            this.onCurrencyValueChange(floatValue, cellInfo);
          }}
          onBlur={e => {
            console.log('blur!!!', e.target.getFloatValue())
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
