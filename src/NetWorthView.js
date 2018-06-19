import React, { Component } from 'react';
import './NetWorthView.css';
import { getSymbolForCurrency, convertToBig } from './util';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import CurrencyInput from 'react-currency-input';
import Currency from 'react-currency-formatter';
import { BarChart } from 'react-easy-chart';

/**
 * This class takes care of displaying the Net Worth data to the user
 * It contains view-related concerns only
 */
class NetWorthView extends Component {

  onCurrencySelectorChange(event) {
    this.props.onCurrencySelectorChange(event.target.value);
  }

  onNumericInputChange(floatValue, cellInfo) {
    // Copy the original prop data to avoid mutating the prop
    // TODO: Is there a more performant way of doing this?
    let newData = JSON.parse(JSON.stringify(cellInfo.tdProps.rest.originaldata));
    let dataItem = newData[cellInfo.row.name];

    const floatValueBig = convertToBig(floatValue);
    const originalValueBig = convertToBig(dataItem[cellInfo.column.id]);

    // If the value actually changed, notify our listeners.
    if (floatValueBig.eq(originalValueBig) === false) {
      dataItem[cellInfo.column.id] = floatValueBig;
      this.props.onTableDataChange(cellInfo.tdProps.rest.tablename, newData);
    }
  }

  renderReadOnlyCurrencyValue = cellInfo => {
    return (
      <Currency
        quantity={parseFloat(cellInfo.value)}
        currency={this.props.currency}
        locale='en_CA'
      />
    );
  }

  renderSummaryRow(title, valueBig) {
    return (
      <ReactTable
        data={[{ name: title, a: '', b: '', valueBig: valueBig }]}
        columns={[
          {
            accessor: 'name',
            className: 'nwv-static-text-column',
          },
          { Header: '', accessor: 'no-op', },
          { Header: '', accessor: 'no-op', },
          {
            accessor: 'valueBig',
            className: 'nwv-last-column',
            Cell: this.renderReadOnlyCurrencyValue
          },
        ]}
        minRows={0}
        showPagination={false}
        className='nwv-table nwv-summary-table'
      />
    );
  }

  renderEditableCurrencyValue = cellInfo => {
    return (
      <div>
        <CurrencyInput
          prefix={getSymbolForCurrency(this.props.currency)}
          selectAllOnFocus
          value={cellInfo.value}
          ref={input => {
            if (input) {
              input.theInput.ref = input;
            }
          }}
          onBlur={(event) => {
            this.onNumericInputChange(event.target.ref.state.value, cellInfo);
          }}
          className='nwv-currency-input'
        />
      </div>
    );
  };

  renderEditablePercentageValue = cellInfo => {
    return (
      <div>
        <CurrencyInput
          suffix='%'
          selectAllOnFocus
          precision={0}
          value={cellInfo.value}
          ref={input => {
            if (input) {
              input.theInput.ref = input;
            }
          }}
          onBlur={(event) => {
            let val = event.target.ref.state.value;
            if (val > 100) {
              val = 100;
            }
            this.onNumericInputChange(val, cellInfo);
          }}
          className='nwv-percent-input'
        />
      </div>
    );
  };

  /**
   * For a given balance sheet type (i.e. assets vs liabilities), renders a table per category.
   * Examples of categories are 'Cash and Investments', and 'Short Term Liabilities'
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
                accessor: 'name',
                className: 'nwv-static-text-column',
                headerClassName: 'nwv-static-text-column'
              },
              {
                Header: categoryCounter === 0 ? 'Monthly Payment' : '',
                accessor: 'monthlyPaymentBig',
                Cell: this.renderEditableCurrencyValue,
                headerClassName: 'nwv-middle-columns-header',
                maxWidth: 150,
                show: balanceSheetType === 'liabilities',
              },
              {
                Header: '',
                accessor: 'no-op',
                maxWidth: 150,
                show: balanceSheetType === 'assets',
              },
              {
                Header: categoryCounter === 0 ? 'Interest Rate' : '',
                accessor: 'interestRateBig',
                Cell: this.renderEditablePercentageValue,
                maxWidth: 120,
                headerClassName: 'nwv-middle-columns-header'
              },
              {
                accessor: 'valueBig',
                className: 'nwv-last-column',
                maxWidth: 150,
                Cell: this.renderEditableCurrencyValue
              },
            ]}
            minRows={0}
            showPagination={false}
            className='-striped -highlight nwv-table'
          />
        </div>
      );
      categoryCounter++;
    }
    return tables;
  }

  renderFutureNetWorthChart(futureNetWorthArray) {
    const chartData = [];
    let year = (new Date()).getFullYear() + 1;
    futureNetWorthArray.forEach((netWorthValueBig) => {
      chartData.push({
        x: year,
        y: netWorthValueBig,
      });
      year += 1;
    });

    return (
      <div className='nwv-future-net-worth-chart'>
        <BarChart
          axes
          axisLabels={{y: `Net Worth (${getSymbolForCurrency(this.props.currency)})`}}
          style={{ '.label': { fill: 'black' } }}
          width={800}
          margin={{top: 0, right: 0, bottom: 30, left: 100}}
          data={chartData}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1 className='nwv-title'>Tracking your Net Worth</h1>
        <div className='nwv-select-currency-row'>
          <span>Select Currency: </span>
          <select onChange={(event) => {
            this.onCurrencySelectorChange(event)
          }}>
            <option value='USD'>USD</option>
            <option value='CAD'>CAD</option>
            <option value='EUR'>EUR</option>
            <option value='GBP'>GBP</option>
            <option value='INR'>INR</option>
          </select>
        </div>
        {this.renderSummaryRow('Net Worth', this.props.netWorthBig)}
        <hr />
        <div>
          <h2 className='nwv-section-heading'>Assets</h2>
        </div>
        {this.renderTablesForBalanceSheetType('assets', this.props.assets)}
        {this.renderSummaryRow('Total Assets', this.props.totalAssetsBig)}
        <hr />
        <div>
          <h2 className='nwv-section-heading'>Liabilities</h2>
        </div>
        {this.renderTablesForBalanceSheetType('liabilities', this.props.liabilities)}
        {this.renderSummaryRow('Total Liabilities', this.props.totalLiabilitiesBig)}
        <hr />
        <div>
          <h2 className='nwv-section-heading'>Your Future Net Worth</h2>
        </div>
        <div>
          {this.renderFutureNetWorthChart(this.props.futureNetWorth)}
        </div>
      </div>
    );
  }
}

export default NetWorthView;
