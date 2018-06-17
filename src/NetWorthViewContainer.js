import React, { Component } from "react";
import NetWorthView from "./NetWorthView";

class NetWorthViewContainer extends Component {
  constructor() {
    super();

    this.state = {
      assetsCash: [],
      assetsLongTerm: [],
      liabilitiesShortTerm: [],
      liabilitiesLongTerm: [],
      netWorth: 0,
      totalAssets: 0,
      totalLiabilities: 0,
      currency: 'USD',
    };
  }

  componentDidMount() {
    this.setState({
      assetsCash:
        [
          {
            name: 'Chequing',
            interestRate: 0,
            value: 2000,
          },
          {
            name: 'Savings for Taxes',
            interestRate: 5,
            value: 4000,
          }
        ],
        assetsLongTerm:
        [
          {
            name: 'Primary Home',
            interestRate: 1,
            value: 4555000,
          },
          {
            name: 'Second Home',
            interestRate: 2,
            value: 1564321,
          }
        ],
        liabilitiesShortTerm:
        [
          {
            name: 'Credit Card 1',
            monthlyPayment: 200,
            interestRate: 50,
            value: 4342,
          },
          {
            name: 'Credit Card 2',
            monthlyPayment: 150,
            interestRate: 22,
            value: 322,
          }
        ],
        liabilitiesLongTerm:
        [
          {
            name: 'Mortgage 1',
            monthlyPayment: 2000,
            interestRate: 2.6,
            value: 250999,
          },
          {
            name: 'Mortgage 2',
            monthlyPayment: 3500,
            interestRate: 5.4,
            value: 622634,
          }
        ],
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
      assetsCash={this.state.assetsCash}
      assetsLongTerm={this.state.assetsLongTerm}
      liabilitiesShortTerm={this.state.liabilitiesShortTerm}
      liabilitiesLongTerm={this.state.liabilitiesLongTerm}
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
