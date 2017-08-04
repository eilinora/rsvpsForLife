import React, { Component } from 'react';

import {
	Monosynth,
	Song,
	Sequencer,
	Synth
} from '../react-music';

export default class Soundtrack extends Component { 
	render() {
		if (this.props.tempo > 0) {
			return (
				<Song tempo={this.props.tempo} playing={true}>
				  <Sequencer resolution={16} bars={4}>
					<Monosynth
					   gain = {0.2}
					   glide = {0.25}
					   type="square"
					   steps={[
						   [0, 5, 'c3'],
						   [4, 5, 'c#3'],
						   [8, 5, 'd#3'],
						   [12, 5, 'c3'],
						   [16, 5, 'c3'],
						   [20, 5, 'c#3'],
						   [24, 5, 'd#3'],
						   [28, 5, 'c3'],
						   [32, 5, 'c3'],
						   [36, 5, 'c#3'],
						   [40, 5, 'd#3'],
						   [44, 5, 'c3'],
						   [48, 5, 'c3'],
						   [52, 5, 'c#3'],
						   [56, 5, 'd#3'],
						   [60, 4, 'c3'],
					   ]}
					   />
					<Synth
					   type="triangle"
					   envelope={{
						   attack: 0,
						   delay: 0,
						   sustain: 1,
						   release: 0
					   }}
					   gain={0.1}
					   steps={[
						   [0, 16, 'c4'],
						   [16, 16, 'g4'],
						   [32, 32, 'f#4']
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
