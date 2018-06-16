import React, { Component } from "react";
import "./NetWorthView.css";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class NetWorthView extends Component {

  onAssetsCashChange(assetsCash) {
      this.props.onAssetsCashChange(assetsCash);
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
          //TODO: consider not changing props!
          let row = this.props.assetsCash[cellInfo.index];
          if (row[cellInfo.column.id] !== e.target.innerHTML) {
            row[cellInfo.column.id] = e.target.innerHTML;
            this.onAssetsCashChange(this.props.assetsCash);
          }
        }}
        dangerouslySetInnerHTML={{
          __html: this.props.assetsCash[cellInfo.index][cellInfo.column.id]
        }}
      />
      </div>
    );
  };

  render() {
    const { assetsCash } = this.props;

    return (
      <div className="App">
        <div>
          <ReactTable
            data={assetsCash}
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
            defaultPageSize={10}
            showPagination={false}
            className="-striped -highlight"
          />
        </div>
      </div>
    );
  }
}

export default NetWorthView;
