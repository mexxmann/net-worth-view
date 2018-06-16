import React, { Component } from "react";
import NetWorthView from "./NetWorthView";

class App extends Component {
  constructor() {
    super();

    this.state = {
      assetsCash: [],
    };

    this.onAssetsCashChange = this.onAssetsCashChange.bind(this);
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
        ]
    });
  }

  onAssetsCashChange(assetsCash) {
    this.setState({assetsCash});
    console.log(assetsCash);
  }

  render() {
    const assetsCash = this.state.assetsCash;

    return <NetWorthView
      assetsCash={assetsCash}
      onAssetsCashChange={this.onAssetsCashChange}
    />;
  }
}

export default App;
