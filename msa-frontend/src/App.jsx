
import './app.css';
import { BrowserRouter, Route  } from 'react-router-dom';
import React, { Component } from 'react';
import SelectInsurance from './pages/selectInsurance';
import Contraction from './pages/contraction';

class App extends Component {
  state = {
    
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Route path="/" component={SelectInsurance} exact/>
          <Route path="/contract" component={Contraction}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;