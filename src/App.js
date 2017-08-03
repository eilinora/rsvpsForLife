import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// import Helmet from 'react-helmet';

import Welcome from './welcome/Welcome';
import Game from './game/Game';
import Finish from './finish/Finish';

// const baseCSSHref = require('file-loader?name=[name].[hash:7].css!require-loader!css-loader!sass-loader!../assets/main.scss');
        /*<Helmet defaultTitle="RSVPs For Life">
          <link rel="stylesheet" type="text/css" href={webfontCSSHref} />
          <link rel="stylesheet" type="text/css" href={baseCSSHref} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        </Helmet>*/
class App extends Component {
  render() {
    return (
      <Router>

        <div>
          <ul>
            <li><Link to="/">Welcome</Link></li>
            <li><Link to="/game">Game</Link></li>
            <li><Link to="/finish">Finish</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={Welcome}/>
          <Route path="/game" component={Game}/>
          <Route path="/finish" component={Finish}/>
        </div>
      </Router>);
  }
}

export default App;
