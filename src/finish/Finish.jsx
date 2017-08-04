import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bounds from 'meetup-web-components/lib/layout/Bounds';
import Chunk from 'meetup-web-components/lib/layout/Chunk';
import Section from 'meetup-web-components/lib/layout/Section';

export default class Finish extends Component { 
	render() {
		return (
			<Bounds>
				<Section className='align--center'>
					<Chunk className='padding--top margin--top'>
						<h2 className='text--pageTitle'>Your Dead :(</h2>
					</Chunk>
				</Section>
				<Section className='align--center'>
					<Link className='button button--primary' to='/game'>Try again!</Link>
				</Section>
			</Bounds>);
	}
}
