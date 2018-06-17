import React, { Component } from "react";
import NetWorthView from "./NetWorthView";

class NetWorthViewContainer extends Component {
  constructor() {
    super();

    this.state = {
      assets: [],
      liabilities: [],
      netWorth: 0,
      totalAssets: 0,
      totalLiabilities: 0,
      currency: 'USD',
    };
  }

  componentDidMount() {
    this.setState({
      assets: {
        'Chequing': {
          interestRate: 0,
          value: 2000,
          category: 'Cash and Investments'
        },
        'Savings for Taxes': {
          interestRate: 5,
          value: 4000,
          category: 'Cash and Investments',
        },
        'Primary Home': {
          interestRate: 1,
          value: 4555000,
          category: 'Long Term Assets',
        },
        'Second Home': {
          interestRate: 2,
          value: 1564321,
          category: 'Long Term Assets',
        }
      },
      liabilities: {
        'Credit Card 1': {
          monthlyPayment: 200,
          interestRate: 50,
          value: 4342,
          category: 'Short Term Liabilities'
        },
        'Credit Card 2': {
          monthlyPayment: 150,
          interestRate: 22,
          value: 322,
          category: 'Short Term Liabilities'
        },
        'Mortgage 1': {
          monthlyPayment: 2000,
          interestRate: 2.6,
          value: 250999,
          category: 'Long Term Debt',
        },
        'Mortgage 2': {
          monthlyPayment: 3500,
          interestRate: 5.4,
          value: 622634,
          category: 'Long Term Debt',
        }
      },
      netWorth: 1292130,
      totalAssets: 2200427,
      totalLiabilities: 908297,
      currency: 'USD',
    });
  }

  onTableDataChange(tableName, data) {
    let newState = [];
    newState[tableName] = data;
    this.setState(newState, () => {
      console.log('Detected Table Data Change - new state: ', this.state)
    });
  }

  onCurrencyChange(currency) {
    this.setState({currency}, () => {
      console.log('Detected Currency Change - new state: ', this.state)
    });
  }

  render() {
    return <NetWorthView
      assets={this.state.assets}
      liabilities={this.state.liabilities}
      netWorth={this.state.netWorth}
      totalAssets={this.state.totalAssets}
      totalLiabilities={this.state.totalLiabilities}
      currency={this.state.currency}
      onTableDataChange={this.onTableDataChange.bind(this)}
      onCurrencySelectorChange={this.onCurrencyChange.bind(this)}
    />;
  }
}

export default NetWorthViewContainer;
