import React, { Component } from "react";
import NetWorthView from "./NetWorthView";

class NetWorthViewContainer extends Component {
  constructor() {
    super();

    this.state = {
      assetsCash: [],
      assetsLongTerm: [],
    };

    this.onTableDataChange = this.onTableDataChange.bind(this);
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
        ]
    });
  }

  onTableDataChange(tableName, data) {
    let newState = [];
    newState[tableName] = data;
    this.setState(newState, () => {
      // console.log('new state: ', this.state)
    });
  }

  render() {
    const assetsCash = this.state.assetsCash;
    const assetsLongTerm = this.state.assetsLongTerm;

    return <NetWorthView
      assetsCash={assetsCash}
      assetsLongTerm={assetsLongTerm}
      onTableDataChange={this.onTableDataChange}
    />;
  }
}

export default NetWorthViewContainer;
