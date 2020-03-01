import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import './assets/styles/app.scss';

const App = () => (
  <Router>
    <Routes />
  </Router>
)

const RootElement = document.getElementById('root');

ReactDOM.render(
    <App />,
    RootElement
);
