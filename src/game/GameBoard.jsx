import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Piece from './Piece';
import Character from './Character';

const raf = window.requestAnimationFrame;
const gameBoardWidth = 900;
const lifeForceStart = 200;
const lifeRate = 0.2;
const lifeBoost = 2;

class GameBoard extends Component { 
	constructor(props) {
		super(props);

		this.isActive = true;
		this.state = {
			life: lifeForceStart,
			startTime: Date.now(),
		};

		this.tick = this.tick.bind(this);
		this.onHit = this.onHit.bind(this);
		this.onTheFloor = this.onTheFloor.bind(this);
		this.onKillGame = this.onKillGame.bind(this);

		raf(this.tick);
	}

	componentWillUnmount() {
		this.onKillGame();
	}

	onKillGame() {
		this.isActive = false;
	}

	tick () {
		if(this.isActive) {
			if (this.state.life < 0) {
				this.onKillGame();
			} else {
				this.setState(state => ({
					life: state.life-lifeRate
				}));
				raf(this.tick);
			}
		}
	}

	onHit(response) {
		if (response === 'yes') {
			this.setState(state => ({
				life: state.life + lifeBoost
			}));
		} else {
			console.log('kill me!!!!');
			this.onKillGame();
		}
	}

	onTheFloor(rsvp_id) {
		this.setState(state => ({
			life: state.life - lifeBoost
		}));
	}

	render() {
		const { rsvps, history } = this.props;
		if (!this.isActive) {
			// history.push('/finish');
		}

		const pieces = rsvps.slice(0,50).map((rsvp, index) => {
			return (
				<Piece key={rsvp.rsvp_id} rsvp={rsvp} character={this.character} gameWidth={gameBoardWidth} onHit={this.onHit} onTheFloor={this.onTheFloor} />
			)
		});

		return (
			<div className='board' style={{width:`${gameBoardWidth}px`}}>
				<div className='life-force' style={{width:this.state.life}} />
				<div>{pieces}</div>
				<Character gameBoardWidth={gameBoardWidth} gameActive={this.isActive} ref={c => this.character = c}/>
			</div>
		);
	}
}

export default withRouter(GameBoard);
