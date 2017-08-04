import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bounds from 'meetup-web-components/lib/layout/Bounds';
import Chunk from 'meetup-web-components/lib/layout/Chunk';
import Section from 'meetup-web-components/lib/layout/Section';

export default class Welcome extends Component { 
	render() {
		return (
			<Bounds>
				<Section className='align--center'>
					<Chunk className='padding--top margin--top'>
						<h2 className='text--pageTitle'>The rules</h2>
					</Chunk>
					<Chunk className='margin--center span--50'>
						<p className='text--big'>Hit the Yes RSVPs to live, accidently hit the NOs and your dead. Time is short only way to live is to get all the yeses.</p>
					</Chunk>
					<Chunk className='margin--center span--50'>
						<p className='text--big'>Use the LEFT and RIGHT arrow keys to move your character back and forth.</p>
					</Chunk>
				</Section>
				<Section className='align--center'>
					<Link className='button button--primary' to='/game'>Let the games begin!</Link>
				</Section>
			</Bounds>);
	}
}
