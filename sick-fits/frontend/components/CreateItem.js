import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

export default class CreateItem extends Component {
	state = {
		title: '',
		description: '',
		image: '',
		largeImage: '',
		price: 0
	};

	handleChange = e => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;

		this.setState({ title: e.target.value });
	};

	render() {
		return (
			<Form>
				<fieldset>
					<label htmlFor="title">
						Title
						<input
							type="text"
							id="title"
							placeholder="title"
							required
							value={this.state.title}
							onChange={this.handleChange}
						/>
					</label>
				</fieldset>
				<h2>Sell an Item.</h2>
			</Form>
		);
	}
}
