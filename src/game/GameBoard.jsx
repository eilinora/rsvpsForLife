import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Piece from './Piece';

const raf = window.requestAnimationFrame;
const gameBoardWidth = 900;
const lifeForceStart = 200;
const lifeRate = 0.2;
const lifeBoost = 2;

class GameBoard extends Component { 
	constructor(props) {
		super(props);

    this.state = {
      isAlive: true,
      life: lifeForceStart,
      startTime: Date.now(),
    };

    this.onHit = this.onHit.bind(this);
    this.onTheFloor = this.onTheFloor.bind(this);
    this.tick = this.tick.bind(this);

    raf(this.tick);
	}

  tick () {
    if (this.state.life < 0) {
      console.log('YOUR DEAD!');
      this.setState(state => ({
        isAlive: false
      }));
    } else {
      this.setState(state => ({
        life: state.life-lifeRate
      }));
      raf(this.tick);
    }
  }

  onHit(rsvp_id) {
    console.log('hit!!');
    this.setState(state => ({
      life: state.life + lifeBoost
    }));
  }

  onTheFloor(rsvp_id) {
    this.setState(state => ({
      life: state.life - lifeBoost
    }));
  }

  render() {
    const { rsvps, history } = this.props;
    if (!this.state.isAlive) {
      // history.push('/finish');
    }

    const pieces = rsvps.slice(0,50).map((rsvp, index) => {
      return (
        <Piece key={rsvp.rsvp_id} rsvp={rsvp} gameWidth={gameBoardWidth} onHit={this.onHit} onTheFloor={this.onTheFloor} />
      )
    });

    return (
    	<div className='board' style={{width:`${gameBoardWidth}px`}}>
				<div className='life-force' style={{width:this.state.life}} />
        <div>{pieces}</div>
    	</div>
    );
  }
}

export default withRouter(GameBoard);
