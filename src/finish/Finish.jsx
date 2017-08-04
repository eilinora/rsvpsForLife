import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bounds from 'meetup-web-components/lib/layout/Bounds';
import Chunk from 'meetup-web-components/lib/layout/Chunk';

import background from '../assets/gameOver.jpg';

export default class Finish extends Component { 
	render() {
		return (
			<div className='content'>
				<img className='bg span--50 margin--center' src={background} />
				<Bounds>
					<div className='align--center'>
						<Chunk className='padding--top margin--top'>
							<h2 className='text--pageTitle'>How to play...</h2>
						</Chunk>
						<Chunk className='inverted margin--center span--50'>
							<p>Use the LEFT and RIGHT arrow keys to move your character back and forth.</p>
							<p>Get the YES to live, but avoid the NO's will kill you.</p>
						</Chunk>
						<Chunk className='align--center'>
							<Link className='button button--primary' to='/game'>Try again!</Link>
						</Chunk>
					</div>
				</Bounds>
			</div>);
	}
}
