import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bounds from 'meetup-web-components/lib/layout/Bounds';
import Chunk from 'meetup-web-components/lib/layout/Chunk';
import Section from 'meetup-web-components/lib/layout/Section';

import background from '../assets/gameOver.jpg';

export default class Finish extends Component { 
	render() {
		return (
			<div className='content'>
				<img className='bg span--50 margin--center' src={background} />
				<Bounds>
					<Section className='align--center'>
						<Link className='button button--primary' to='/game'>Try again!</Link>
					</Section>
				</Bounds>
			</div>);
	}
}
