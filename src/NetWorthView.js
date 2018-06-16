import React, { Component } from "react";
import "./NetWorthView.css";

import ReactTable from "react-table";
import "react-table/react-table.css";

class NetWorthView extends Component {

  onTableDataChange(tableName, data) {
    this.props.onTableDataChange(tableName, data);
  }


  renderEditableCurrencyValue = cellInfo => {
    return (
      <div>
      <span>$</span>
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
        <hr/>
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
