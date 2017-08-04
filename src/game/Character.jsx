import React, { Component } from 'react';
import cx from 'classnames';

import flying from '../assets/flying.gif';
import gotHit from '../assets/got-hit.gif';

const raf = window.requestAnimationFrame;

// t: current time, b: begInnIng value, c: change In value, d: duration
const easingFn = function (x, t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
};

export default class Character extends Component {
	constructor(props) {
		super(props);

		this.tick = this.tick.bind(this);

		this.isActive = true;
		document.addEventListener('keydown', this.tick);
		this.state = {
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
			const goingRight = e.code === 'ArrowRight';
			const direction = goingRight ? diff : -diff;

			this.setState(state => ({
				goingRight: goingRight,
				styles: {
					...state.styles,
					left: state.styles.left + direction
				}
			}));
		}
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
				'character--left': !this.state.goingRight,
				'character--right': this.state.goingRight,
			}
		);

		return (
			<div className={classNames} style={this.state.styles} ref={c => this.characterEl = c}>
				<img src={flying} width="125px" height="90px"/>
			</div>
		);
	}
}