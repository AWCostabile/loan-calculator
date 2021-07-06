import { Calculator } from 'components/calculator';
// import logo from 'images/logo.svg';
import React from 'react';
import './home.css';

export const Home: React.FC = () => (
  <div className="App">
    <div className="App-header">
      <Calculator />
    </div>
  </div>
);
