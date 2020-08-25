import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tabs from './Components/Tabs';


const App = () => {
  return (
    <div className="app">
        <div className="app__header">
            <div className="app__header-logo">
                <img src={logo} alt="logo" />
            </div>
        </div>
        <div className="app__wrapper">
            <Tabs/>
        </div>
    </div>
  );
}

export default App;
