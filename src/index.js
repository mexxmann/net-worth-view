import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NetWorthViewContainer from './NetWorthViewContainer';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NetWorthViewContainer />, document.getElementById('root'));
registerServiceWorker();
