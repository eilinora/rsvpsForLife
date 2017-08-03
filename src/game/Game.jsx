import React, { Component } from 'react';
import Websocket from 'react-websocket';
import Flex from 'meetup-web-components/lib/layout/Flex';
import FlexItem from 'meetup-web-components/lib/layout/FlexItem';

import RSVPViewer from './RSVPViewer';

const STREAM_URL = 'ws://stream.meetup.com/2/rsvps';

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
			rsvps: [JSON.parse(data), ...state.rsvps]
		}));
	}

  render() {
    return (
    	<div>
				<Websocket url={STREAM_URL} onMessage={this.handleData}/>

				<Flex>
					<FlexItem>

					</FlexItem>
					<FlexItem shrink>
						<RSVPViewer rsvps={this.state.rsvps} />
					</FlexItem>
				</Flex>
    	</div>
    );
  }
}
