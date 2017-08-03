import React, { Component } from 'react';
import Piece from './Piece';

const gameBoardWidth = 900;

export default class GameBoard extends Component { 
	constructor(props) {
		super(props);
    this.state = {
      rsvps: props.rsvps
    };
    this.onKillMe = this.onKillMe.bind(this);
	}

  componentWillReceiveProps(nextProps) {
    // const newRSVPs = nextProps.rsvps.filter(
    //   (rsvp, index) =>
    //     !this.state.rsvps.find(stateRSVP => stateRSVP.rsvp_id === rsvp.rsvp_id)
    // );
    // this.setState((state) => ({
    //   rsvps: nextProps.rsvps //[...newRSVPs, ...this.state.rsvps]
    // }));
  }

  onKillMe(rsvp_id) {
    console.log('kill me', rsvp_id);
    this.setState((state) => ({
      rsvps: state.rsvps.filter(rsvp => rsvp.rsvp_id !== rsvp_id)
    }));
  }

  render() {
    const { rsvps } = this.props;
    const pieces = this.state.rsvps.map((rsvp, index) => (
      <Piece key={rsvp.rsvp_id} rsvp={rsvp} gameWidth={gameBoardWidth} killMe={this.onKillMe} />
    ));
    return (
    	<div className='board' style={{width:`${gameBoardWidth}px`}}>
				{pieces}
    	</div>
    );
  }
}
