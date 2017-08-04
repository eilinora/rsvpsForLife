import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Welcome from './welcome/Welcome';
import Game from './game/Game';
import Finish from './finish/Finish';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/**<ul>
            <li className='display--inline padding--right'><Link to="/">Welcome</Link></li>
            <li className='display--inline padding--right'><Link to="/game">Game</Link></li>
            <li className='display--inline padding--right'><Link to="/finish">Finish</Link></li>
          </ul>

          <hr/>**/}

          <Route exact path="/" component={Welcome}/>
          <Route path="/game" component={Game}/>
          <Route path="/finish" component={Finish}/>
        </div>
      </Router>);
  }
}

export default App;
