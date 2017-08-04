import React, { Component } from 'react';
import Websocket from 'react-websocket';

// import gameBackground from '../assets/background.jpg';

import GameBoard from './GameBoard';
import RSVPViewer from './RSVPViewer';

const STREAM_URL = 'ws://stream.meetup.com/2/rsvps';
const RSVP_BUFFER_LENGTH = 2048;
const RSVP_TIME_SAMPLE_BUFFER_LENGTH = 60;
function truncateArray(a, max) {
	if (a.length >= max) {
		a.pop();
	}
	return a;
}

const uniqueArray = (ar, newItem) => ar.filter(item =>
   item.rsvp_id !== newItem.rsvp_id
);

export default class Game extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			rsvps: [],
			rsvpTimer: {
				times: [],
				rsvpsPerMin: 80
			}
		};
		this.handleData = this.handleData.bind(this);
		this.updateRsvpTimer = this.updateRsvpTimer.bind(this);
	}

	updateRsvpTimer(timer) {
		const now = new Date();
		let rsvpsPerMin = timer.rsvpsPerMin;
		const times = [now, ...timer.times.slice(0, RSVP_TIME_SAMPLE_BUFFER_LENGTH)];
		if (times.length > 10) {
			const totalTime = times[0] - times[times.length - 1];
			const avgPeriodMs = totalTime / (times.length - 1);
			rsvpsPerMin = 60 * 1000.0 / avgPeriodMs;
		}

		return {
			times: times,
			rsvpsPerMin: rsvpsPerMin
		};
	}

	handleData(data) {
		const newItem = JSON.parse(data);
		const rsvps = uniqueArray(truncateArray(this.state.rsvps, RSVP_BUFFER_LENGTH), newItem);
		this.setState((state, props) => ({
			rsvps: [newItem, ...rsvps],
			rsvpTimer: this.updateRsvpTimer(state.rsvpTimer),
			soundtrack: true
		}));
	}

  render() {
    return (
    	<div className='gameBackground'>
				<Websocket url={STREAM_URL} onMessage={this.handleData}/>
				<GameBoard rsvps={this.state.rsvps} rsvpTimer={this.state.rsvpTimer} />
				<RSVPViewer rsvps={this.state.rsvps} />
				<div className='rsvp-ticker'>RSVPs/min: {this.state.rsvpTimer.rsvpsPerMin}</div>
    	</div>
    );
  }
}
