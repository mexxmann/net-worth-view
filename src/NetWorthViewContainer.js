import React, { Component } from "react";
import NetWorthView from "./NetWorthView";

class NetWorthViewContainer extends Component {
  constructor() {
    super();

    this.state = {
      assets: [],
      liabilities: [],
      calculated: {
        netWorthBig: 0,
        totalAssetsBig: 0,
        totalLiabilitiesBig: 0,
        futureNetWorth: [],
      },
      currency: 'USD',
    };
  }

  componentDidMount() {

    fetch('http://localhost:3001/api/networth/1', {
      method: 'get',
    }).then(response => {
      return response.json();
    }).then(jsonResult => {
      this.setState(jsonResult.data, () => {
        console.log('Finished setting INITIAL state from API - new state: ', this.state)
      });
    }).catch(e => {
      console.log('### Failed to retrieve updated Net Worth from API: ', e);
    });
  }

  getComputedOutputs(inputModel, currencyTo) {
    let url = 'http://localhost:3001/api/networth/1';
    if (currencyTo) {
      url += `?currencyTo=${currencyTo}`;
    }
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputModel)
    }).then(response => {
      return response.json();
    }).then(jsonResult => {
      this.setState(jsonResult.data, () => {
        console.log('Finished setting state that was returned from API - new state: ', this.state)
      });
    }).catch(e => {
      console.log('### Failed to retrieve updated Net Worth from API: ', e);
    });
  }

  onTableDataChange(tableName, data) {
    let partialState = {};
    partialState[tableName] = data;
    let newState = Object.assign({}, this.state, partialState);

    this.getComputedOutputs(newState, null);
  }

  onCurrencyChange(currency) {
    this.getComputedOutputs(this.state, currency);
  }

  render() {
    return <NetWorthView
      assets={this.state.assets}
      liabilities={this.state.liabilities}
      netWorthBig={this.state.calculated.netWorthBig}
      totalAssetsBig={this.state.calculated.totalAssetsBig}
      totalLiabilitiesBig={this.state.calculated.totalLiabilitiesBig}
      futureNetWorth={this.state.calculated.futureNetWorth}
      currency={this.state.currency}
      onTableDataChange={this.onTableDataChange.bind(this)}
      onCurrencySelectorChange={this.onCurrencyChange.bind(this)}
    />;
  }
}

export default NetWorthViewContainer;
