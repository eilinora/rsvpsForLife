import React, { Component } from 'react';

import {
	Bitcrusher,
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
				  <Sequencer resolution={16} bars={2}>
					  <Synth
						 gain = {0.2}
						 type="square"
						 steps={[
							 [0, 4, 'c3'],
							 [4, 4, 'g3'],
							 [8, 4, 'e3'],
							 [12, 4, 'g3'],
							 [16, 4, 'd3'],
							 [20, 4, 'g3'],
							 [24, 4, 'f3'],
							 [28, 4, 'g3']
						 ]}
						 />
				  </Sequencer>
				  <Sequencer resolution={16} bars={8}>
					<Synth
					   type="sawtooth"
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
						   [32, 32, 'e4'],
						   [64, 16, 'c4'],
						   [80, 16, 'g4'],
						   [96, 32, 'a4']
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
