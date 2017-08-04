import React, { Component } from 'react';
import cx from 'classnames';

// const durationMax = 80;
const raf = window.requestAnimationFrame;

// t: current time, b: begInnIng value, c: change In value, d: duration
const easingFn = function (x, t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
};

export default class Character extends Component {
	constructor(props) {
		super(props);

		// this.onHit = this.onHit.bind(this);
		this.tick = this.tick.bind(this);
		this.stopTicks = this.tick.bind(this);

		this.isActive = true;
		document.addEventListener('keydown', this.tick);
		document.addEventListener('keyup', this.stopTicks);
		this.state = {
			// rsvp: props.rsvp,
			// startPos: 0,
			// endPos: 900,
			// duration: durationMax + Math.random()*20,
			// startTime: Date.now(),
			// hide: false,
			isMoving: false,

			styles: {
				bottom: 0,
				left: props.gameBoardWidth/2,
			}
		};
		
		raf(this.tick);
	}

	tick(e) {
		const diff = 15;
		const allowedKeys = ['ArrowRight', 'ArrowLeft'];
		if (this.isActive && allowedKeys.includes(e.code)) {
			const direction = e.code === 'ArrowRight' ? diff : -diff;

			this.setState(state => ({
				styles: {
					...state.styles,
					left: state.styles.left + direction
				}
			}));
		}
	}

	stopTicks() {

	}

	componentWillUnmount() {
		this.isActive = false;
		document.removeEventListener('keydown', this.tick);
		document.removeEventListener('keyup', this.stopTicks);
	}

	render() {
		const classNames = cx(
			'character',
			{
			}
		);
//
		return (
			<div className={classNames} style={this.state.styles} ref={c => this.characterEl = c}></div>
		);
	}
}