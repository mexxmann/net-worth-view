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

    fetch('http://localhost:3001/api/networth/1', {
      method: 'get',
    }).then(response => {
      return response.json();
    }).then(netWorthModel => {
      this.setState(netWorthModel, () => {
        console.log('Finished setting INITIAL state from API - new state: ', this.state)
      });
    }).catch(e => {
      console.log('### Failed to retrieve updated Net Worth from API: ', e);
    });
  }

  onTableDataChange(tableName, data) {
    let partialState = {};
    partialState[tableName] = data;
    let newState = Object.assign({}, this.state, partialState);

    fetch('http://localhost:3001/api/networth/1', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newState)
    }).then(response => {
      return response.json();
    }).then(newNewState => {
      this.setState(newNewState, () => {
        console.log('Finished setting state that was returned from API - new state: ', this.state)
      });
    }).catch(e => {
      console.log('### Failed to retrieve updated Net Worth from API: ', e);
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
