import React, { Component } from 'react';

import {
	Song,
	Sequencer,
	Synth
} from '../react-music';

export default class Soundtrack extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			playing: true
		}
	}

	render() {
		if (this.props.tempo > 0) {
			return (
				<Song tempo={this.props.tempo} playing={this.state.playing}>
				  <Sequencer resolution={16} bars={1}>
					<Synth
					   type="sine"
					   steps={[
						   [0, 8, 'c4'],
						   [8, 4, 'd4'],
					   ]}
					   />
				  </Sequencer>
				</Song>
			);
		} else {
			return (null);
		}
	}
}
