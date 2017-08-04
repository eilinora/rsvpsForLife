import React, { Component } from 'react';
import cx from 'classnames';

import flying from '../assets/flying.gif';
import gotHit from '../assets/got-hit.gif';

const diff = 20;
const startJump = 100;
const jumpHeight = 100;
const jumpDuration = 50;
const raf = window.requestAnimationFrame;

// t: current time, b: begInnIng value, c: change In value, d: duration
const easingFn = function (x, t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
};

export default class Character extends Component {
	constructor(props) {
		super(props);

		this.tick = this.tick.bind(this);
		this.jumping = this.jumping.bind(this);
		this.fallDown = this.fallDown.bind(this);

		this.isActive = true;
		document.addEventListener('keydown', this.tick);
		this.state = {
			isMoving: false,

			styles: {
				bottom: `${startJump}px`,
				left: props.gameBoardWidth/2,
			}
		};
		
		raf(this.tick);
	}

	tick(e) {
		const allowedKeys = ['ArrowRight', 'ArrowLeft'];
		if (this.isActive) {
			if (allowedKeys.includes(e.code)) {
				const goingRight = e.code === 'ArrowRight';
				const direction = goingRight ? diff : -diff;

				this.setState(state => ({
					goingRight: goingRight,
					styles: {
						...state.styles,
						left: state.styles.left + direction
					}
				}));
			} else if (e.code === 'Space' && !this.state.isJumping) {
				this.setState(state => ({
					isJumping: true,
					startTime: Date.now(),
					startPos: startJump,
					endPos: startJump + jumpHeight,
					duration: jumpDuration,
					styles: {
						...state.styles,
						bottom: `${startJump}px`
					}
				}));
				raf(this.jumping);
			}
		}
	}

	jumping() {
		if (this.isActive && this.state.isJumping) {
			if(parseInt(this.state.styles.bottom) <= startJump+jumpHeight) {
				this.setState(state => {
					const now = Date.now();

					// progress: starts at 0, ends at > 1
					const t = (now - state.startTime) / state.duration;

					// x: currentPost, t: current time, b: begInnIng value, c: change In value, d: duration
					const bottom = easingFn(state.styles.bottom, t, state.startPos, state.endPos, state.duration);

					return {
						styles: {
							...state.styles,
							bottom
						}
					};
				});
				if (this.state.isFalling) {
					if (parseInt(this.state.styles.bottom) <= startJump) {
						this.setState(state => ({
							isJumping: false,
							isFalling: false,
							styles: {
								...state.styles,
								bottom: startJump
							}
						}));
					}
				}
				
				raf(this.jumping);
				
			} else {
				if (!this.state.isFalling) {
					this.fallDown();
				}
			}
		}
	}

	fallDown() {
		this.setState(state => ({
			isFalling: true,
			startTime: Date.now(),
			startPos: parseInt(state.styles.bottom),
			endPos: -startJump,
			styles: {
				...state.styles,
				bottom: state.styles.bottom-2
			}
		}));
		raf(this.jumping);
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

		const img = this.props.gameActive ? flying : gotHit;

		return (
			<div className={classNames} style={this.state.styles}>
				<img src={img} width="125px" height="90px"/>
				<div className='hit-area'  ref={c => this.characterEl = c} />
			</div>
		);
	}
}