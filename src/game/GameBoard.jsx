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

const soundPaths = {
	"bubbleAppear": {
		path: 'samples/down.wav',
		gain: 0.5
	},
	"hit": {
		path: 'samples/up.wav',
		gain: 1.0
	}
};

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

		this.loadSounds();
		this.soundBuffers = {};
		this.playSound = this.playSound.bind(this);

		raf(this.tick);
	}

	loadSounds() {
		var that = this;
		Object.keys(soundPaths).forEach(key => {
			var request = new XMLHttpRequest();
			request.open('GET', soundPaths[key].path, true);
			request.responseType = 'arraybuffer';
			request.onload = function() {
				that.audioContext.decodeAudioData(request.response, function(buffer) {
					that.soundBuffers[key] = buffer;
				}, () => console.log("something just broke"));
			};
			request.send();
		});
	}
	playSound(name) {
		if(this.soundBuffers[name]) {
			const source = this.audioContext.createBufferSource();
			const gainNode = this.audioContext.createGain();
			gainNode.gain.value = soundPaths[name].gain;
			source.buffer = this.soundBuffers[name];
			source.connect(gainNode);
			gainNode.connect(this.audioContext.destination);
			source.start(0);
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
			this.playSound("hit");
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
				<Piece key={rsvp.rsvp_id} appear={() => this.playSound("bubbleAppear")} rsvp={rsvp} character={this.character} gameWidth={gameBoardWidth} onHit={this.onHit} onTheFloor={this.onTheFloor} audioContext={this.audioContext}/>
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
