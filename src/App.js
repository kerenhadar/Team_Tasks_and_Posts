import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  './serviceWorker';
import MainPage from './MainPage/MainPage'
//team
class App extends Component {

  render() {
    
    return (
      <div className="App">
        {<MainPage/>}
      </div>
    );
  }
}

export default App;
