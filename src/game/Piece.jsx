import React, { Component } from 'react';
import cx from 'classnames';

const durationMax = 70;
const raf = window.requestAnimationFrame;

// t: current time, b: begInnIng value, c: change In value, d: duration
const easingFn = function (x, t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
};

export default class Piece extends Component {
  constructor(props) {
    super(props);

    this.onHit = this.onHit.bind(this);
    this.tick = this.tick.bind(this);

		this.state = {
			rsvp: props.rsvp,
			startPos: 0,
			endPos: 900,
			duration: durationMax + Math.random()*20,
			startTime: Date.now(),
			hide: false,

			styles: {
				display: 'flex',
				alignItems: 'center',
				left: props.gameWidth*Math.random(),
				top:0
			}
		};
    
    raf(this.tick);
  }

  tick() {
		if (!this.state.hide) {
			if(this.state.styles.top < this.state.endPos) {
				this.setState(state => {
					const now = Date.now();
					// progress: starts at 0, ends at > 1
					const t = (now - state.startTime) / state.duration;

					return {
						styles: {
							...state.styles,
							// t: current time, b: begInnIng value, c: change In value, d: duration
							top: easingFn(state.styles.top, t, state.startPos, state.endPos, state.duration)
						}
					};
				});

		  	raf(this.tick);
		  } else {
		  	this.setState(state => ({
			  	hide: true
		  	}));
		  	this.props.onTheFloor(this.state.rsvp.rsvp_id);
		  }
		}
	}

	componentWillUnmount() {
		this.setState(() => ({
			hide: true
		}));
	}

	onHit() {
		this.setState(() => ({
			hide: true
		}));
		this.props.onHit(this.state.rsvp.rsvp_id);
	}

	onTheFloor() {}

	render() {
		const { rsvp } = this.state;
		const { response } = rsvp;

		if (this.state.hide) {
			return false;
		}

		const classNames = cx(
			'piece',
			{
				'going' : response === 'yes',
				'not-going' : response === 'no',
				'waitlist' : response === 'waitlist'
			}
		);

		return (
			<div onClick={this.onHit} className={classNames} style={this.state.styles}>{response}</div>
		);
	}
}