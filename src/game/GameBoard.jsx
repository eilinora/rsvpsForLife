import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Piece from './Piece';
import Character from './Character';
import Soundtrack from './Soundtrack';

const raf = window.requestAnimationFrame;
const gameBoardWidth = window.outerWidth-200;
const lifeForceStart = 250;
const lifeRate = 0.2;
const lifeBoost = 2;

class GameBoard extends Component { 
	constructor(props) {
		super(props);

		this.isActive = true;
		this.state = {
			life: lifeForceStart,
			isHide: false,
			startTime: Date.now()
		};

		this.tick = this.tick.bind(this);
		this.onHit = this.onHit.bind(this);
		this.onTheFloor = this.onTheFloor.bind(this);
		this.onKillGame = this.onKillGame.bind(this);
		raf(this.tick);
	}

	componentWillMount() {
		this.deathSound = new Audio('samples/death.wav');
	}

	componentWillUnmount() {
		this.onKillGame();
	}

	onKillGame() {
		this.isActive = false;
		this.setState(state => ({
			isHide: true
		}));
		this.deathSound.play();
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
		if (!this.isActive || this.state.isHide) {
			// setTimeout(() => {
			// 	history.push('/finish');
			// }, 700);
		}

		const pieces = rsvps.slice(0,50).map((rsvp, index) => {
			return (
				<Piece key={rsvp.rsvp_id} rsvp={rsvp} character={this.character} gameWidth={gameBoardWidth} onHit={this.onHit} onTheFloor={this.onTheFloor} />
			)
		});

		return (
			<div className='board' style={{width:`${gameBoardWidth}px`}}>
				<Soundtrack tempo={this.props.rsvpTimer.rsvpsPerMin} playing={this.isActive}/>
				<div className='life-force' style={{width:this.state.life}} />
				<div>{pieces}</div>
				<Character gameBoardWidth={gameBoardWidth} gameActive={this.isActive} ref={c => this.character = c}/>
			</div>
		);
	}
}

export default withRouter(GameBoard);
