import React, { Component } from 'react';
import cx from 'classnames';

const durationMax = 80;
const raf = window.requestAnimationFrame;
const isCollide = (a, b) => {
	// kick out if anything is undefined
	if (!a || !b) {
		return;
	}

  var aRect = a.getBoundingClientRect();
  var bRect = b.getBoundingClientRect();

  return !(
    ((aRect.top + aRect.height) < (bRect.top)) ||
    (aRect.top > (bRect.top + bRect.height)) ||
    ((aRect.left + aRect.width) < bRect.left) ||
    (aRect.left > (bRect.left + bRect.width))
	);
}

// t: current time, b: begInnIng value, c: change In value, d: duration
const easingFn = function (x, t, b, c, d) {
	return c*((t=t/d-1)*t*t + 1) + b;
};

export default class Piece extends Component {
	constructor(props) {
		super(props);

		this.onHit = this.onHit.bind(this);
		this.tick = this.tick.bind(this);

		this.isActive = true;
		this.state = {
			rsvp: props.rsvp,
			startPos: 0,
			endPos: window.outerHeight + 300,
			duration: durationMax + Math.random()*20,
			startTime: Date.now(),
			isHide: false,

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
		if (this.isActive) {
			const { character } = this.props;
			const { rsvp } = this.state;

			if (isCollide(character.characterEl, this.gamePiece)) {
				this.onHit();
			} else {
				if(parseInt(this.state.styles.top) < this.state.endPos) {
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
					this.onHideMe();
				}
			}
		}
	}

	componentWillUnmount() {
		this.isActive = false;
	}

	onHideMe() {
		this.isActive = false;
		this.setState(state => ({
			isHide: true
		}));
	}

	onHit() {
		this.onHideMe();
		this.props.onHit(this.state.rsvp.response);
	}

	render() {
		const { rsvp } = this.state;
		const { response } = rsvp;

		if (!this.isActive || this.state.isHide) {
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
			<div onClick={this.onHit} className={classNames} style={this.state.styles} ref={c => this.gamePiece = c}>{response}</div>
		);
	}
}