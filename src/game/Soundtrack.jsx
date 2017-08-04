import React, { Component } from 'react';

import {
	Monosynth,
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
					<Monosynth
					   gain = {0.1}
					   glide = {0.5}
					   type="square"
					   steps={[
						   [0, 9, 'c3'],
						   [8, 8, 'd3'],
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
