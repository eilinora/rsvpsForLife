import React, { Component } from 'react';
import Websocket from 'react-websocket';
import Flex from 'meetup-web-components/lib/layout/Flex';
import FlexItem from 'meetup-web-components/lib/layout/FlexItem';

import GameBoard from './GameBoard';
import Soundtrack from './Soundtrack';
import RSVPViewer from './RSVPViewer';

const STREAM_URL = 'ws://stream.meetup.com/2/rsvps';
const RSVP_BUFFER_LENGTH = 2048;
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
			rsvpRate: 80,
			soundtrack: false
		};
		this.handleData = this.handleData.bind(this);
	}

	handleData(data) {
		this.setState((state, props) => ({
			rsvps: [JSON.parse(data), ...truncateArray(state.rsvps, RSVP_BUFFER_LENGTH)]
		}));
	}

  render() {
    return (
    	<div>
				<Websocket url={STREAM_URL} onMessage={this.handleData}/>
				<Soundtrack tempo={this.state.rsvpRate} playing={this.state.soundtrack}/>
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
