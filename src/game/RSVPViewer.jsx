import React, { Component } from 'react';
import AvatarMember from 'meetup-web-components/lib/media/AvatarMember';
import Chunk from 'meetup-web-components/lib/layout/Chunk';
import Flex from 'meetup-web-components/lib/layout/Flex';
import FlexItem from 'meetup-web-components/lib/layout/FlexItem';

const RSVP = (rsvp, index) => {
	if (!rsvp.member) {
		return false
	};

	return (
		<Chunk key={index}>
			<Flex>
				<FlexItem>
					<p>{rsvp.member.member_name}</p>
				</FlexItem>
			</Flex>
		</Chunk>
	);
};


export default class RSVPViewer extends Component { 
  render() {
  	const {rsvps} = this.props;

  	const rsvpsViews = rsvps.map(RSVP);
    return (
    	<div>
    		{rsvpsViews}
    	</div>
    );
  }
}
