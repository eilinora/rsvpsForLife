import React, { Component } from 'react';
import cx from 'classnames';

const raf = window.requestAnimationFrame;

// t: current time, b: begInnIng value, c: change In value, d: duration
const easingFn = function (x, t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
};

export default class Piece extends Component {
  constructor(props) {
    super(props);

    this.startPos = 0;
    this.endPos = 900;
    this.duration = 50 + Math.random()*20;
    this.startTime = Date.now();
    this.hide = false;
    this.tick = this.tick.bind(this);

		this.state = {
			display: 'flex',
			alignItems: 'center',
			left: props.gameWidth*Math.random(),
			top:this.startPos
		};
    
    window.requestAnimationFrame(this.tick);
  }

  tick() {
		const now = Date.now();
		// progress: starts at 0, ends at > 1
		const t = (now - this.startTime) / this.duration;

		// t: current time, b: begInnIng value, c: change In value, d: duration
		this.setState((state) => ({
			top: easingFn(state.top, t, this.startPos, this.endPos, this.duration)
		}));

		if (this.state.top < this.endPos) {
	  	requestAnimationFrame(this.tick);
	  } else {
	  	this.hide = true;
	  	this.props.killMe(this.props.rsvp.rsvp_id);
	  }
	}

	render() {
		if (this.hide) {
			return false;
		}

		const { rsvp } = this.props;

		const classNames = cx(
			'piece',
			{
				['going'] : rsvp.response === 'yes',
				['not-going'] : rsvp.response === 'no',
				['waitlist'] : rsvp.response === 'waitlist'
			}
		);

		return (
			<div className={classNames} style={this.state}>{rsvp.response}</div>
		);
	}
}