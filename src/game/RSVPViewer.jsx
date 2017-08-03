import React, { Component } from 'react';
import AvatarMember from 'meetup-web-components/lib/media/AvatarMember';
import Flex from 'meetup-web-components/lib/layout/Flex';
import FlexItem from 'meetup-web-components/lib/layout/FlexItem';

const RSVP = (rsvp) => {
	if (!rsvp.member) {
		return false
	};
	return <div key={rsvp.member.member_id}>
		<Flex>
			<FlexItem>
				<AvatarMember member={rsvp.member} />
			</FlexItem>
			<FlexItem>
				<p>{rsvp.member.member_name}</p>
				<p>{rsvp.member.member_name}</p>
			</FlexItem>
		</Flex>
	</div>
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
