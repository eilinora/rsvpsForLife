import React, { Component } from 'react';
import Websocket from 'react-websocket';
import Flex from 'meetup-web-components/lib/layout/Flex';
import FlexItem from 'meetup-web-components/lib/layout/FlexItem';

import GameBoard from './GameBoard';
import Soundtrack from './Soundtrack';
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
		var rsvpsPerMin = timer.rsvpsPerMin;
		var times = times = [now, ...timer.times.slice(0, RSVP_TIME_SAMPLE_BUFFER_LENGTH)];
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
		this.setState((state, props) => ({
			rsvps: [JSON.parse(data), ...truncateArray(state.rsvps, RSVP_BUFFER_LENGTH)],
			rsvpTimer: this.updateRsvpTimer(state.rsvpTimer)
		}));
	}

  render() {
    return (
    	<div>
				<Websocket url={STREAM_URL} onMessage={this.handleData}/>
				<Soundtrack tempo={this.state.rsvpTimer.rsvpsPerMin}/>
				<div>RSVPs/min: {this.state.rsvpTimer.rsvpsPerMin}</div>
				<Flex>
					<FlexItem>
						<GameBoard rsvsp={this.state.rsvps} />
					</FlexItem>
					<FlexItem shrink>
						<RSVPViewer rsvps={this.state.rsvps} />
					</FlexItem>
				</Flex>
    	</div>
    );
  }
}
