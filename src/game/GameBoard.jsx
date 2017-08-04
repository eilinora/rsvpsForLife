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

		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.audioContext = new AudioContext();

		this.loadDownSound();
		this.playDownSound = this.playDownSound.bind(this);

		raf(this.tick);
	}

	loadDownSound() {
		var request = new XMLHttpRequest();
		request.open('GET', 'samples/down.wav', true);
		request.responseType = 'arraybuffer';
		var that = this;
		request.onload = function() {
			that.audioContext.decodeAudioData(request.response, function(buffer) {
				that.downBuffer = buffer;
			}, () => console.log("something just broke"));
		};
		request.send();
	}

	playDownSound() {
		if(this.downBuffer) {
			const downSource = this.audioContext.createBufferSource();
			downSource.buffer = this.downBuffer;
			downSource.connect(this.audioContext.destination);
			downSource.start(0);
		}
	}

	componentWillMount() {
		this.hitSound = new Audio('samples/up.wav');
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
			this.hitSound.play();
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
			setTimeout(() => {
				history.push('/finish');
			}, 700);
		}

		const pieces = rsvps.slice(0,50).map((rsvp, index) => {
			return (
				<Piece key={rsvp.rsvp_id} appear={this.playDownSound} rsvp={rsvp} character={this.character} gameWidth={gameBoardWidth} onHit={this.onHit} onTheFloor={this.onTheFloor} audioContext={this.audioContext}/>
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
