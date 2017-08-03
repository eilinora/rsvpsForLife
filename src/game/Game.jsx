import React, { Component } from 'react';
import Websocket from 'react-websocket';
import Flex from 'meetup-web-components/lib/layout/Flex';
import FlexItem from 'meetup-web-components/lib/layout/FlexItem';

import {
  Song,
  Sequencer,
  Sampler
} from 'react-music';

import GameBoard from './GameBoard';
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
			rsvps: []
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
				<Song tempo={90} playing={true}>
				  <Sequencer resolution={16} bars={1}>
					<Sampler
					   sample="/samples/cowbell.wav"
					   steps={[0, 4, 8, 12]}
					/>
				  </Sequencer>
				</Song>

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
