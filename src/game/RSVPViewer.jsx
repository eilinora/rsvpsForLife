import React, { Component } from 'react';
import cx from 'classnames';
import Chunk from 'meetup-web-components/lib/layout/Chunk';
import Flex from 'meetup-web-components/lib/layout/Flex';
import FlexItem from 'meetup-web-components/lib/layout/FlexItem';

const MAX_VIEWED = 20;
const RSVP = (rsvp, index) => {
	if (!rsvp.member) {
		return false
	};
	const classNames = cx(
		'response',
		{
			'going' : rsvp.response === 'yes',
			'not-going' : rsvp.response === 'no',
			'waitlist' : rsvp.response === 'waitlist'
		}
	);
	return (
		<Chunk key={index}>
			<Flex>
				<FlexItem shrink>
					<div className="avatar avatar--person" role="img" style={{ backgroundImage: `url(${rsvp.member.photo})`}}></div>
				</FlexItem>
				<FlexItem>
					<p className='text--small'><strong>{rsvp.member.member_name}</strong></p>
					<Flex>
						<FlexItem shrink><div className={classNames}><span className='text--white'>✔</span></div></FlexItem>
						<FlexItem><p>{rsvp.response}</p></FlexItem>
					</Flex>
				</FlexItem>
			</Flex>
		</Chunk>
	);
};


export default class RSVPViewer extends Component { 
  render() {
  	const {rsvps} = this.props;

  	const rsvpsViews = rsvps.slice(0,MAX_VIEWED).map(RSVP);
    return (
    	<div className='rsvp-views padding--top'>
    		{rsvpsViews}
    	</div>
    );
  }
}
