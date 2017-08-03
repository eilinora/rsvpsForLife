import React, { Component } from 'react';

import {
  Song,
  Sequencer,
  Sampler
} from 'react-music';

export default class Soundtrack extends Component { 
    render() {
	if (this.props.tempo > 0) {
	    return (
		    <Song tempo={this.props.tempo} playing={this.props.playing}>
		    <Sequencer resolution={16} bars={1}>
		    <Sampler
			sample="/samples/cowbell.wav"
			steps={[0, 4, 8, 12]}
		    />
		    </Sequencer>
		    </Song>
	    );
	} else {
	    return (null);
	}
    }
}
