import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const dogStyle = {
	color: 'brown'
}

const catStyle = {
	color: 'blue'
}

// Show user info
const UserInfo = props => {
	const user = props.user;

	return (
		<div>
			<img src={user.picture.large} />

			<div>
				{user.name.first + ' ' + user.name.last}
			</div>
		</div>
	)
}

// List Dog and Cat people
const UserList = props => {
	const users = props.users;
	const removeUser = props.handler;

	return (
		<div>
			<h2>
				{props.list} People
			</h2>

			<ul>
				{
					users.map(function(user, index) {
						return (
							<li>
								<UserInfo user={user} />
								<a onClick={() => removeUser(index, props.list)}>
									X
								</a>
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}

class App extends Component {

	state = {
		number: 25,
		dogPeople: [],
		catPeople: [],
	};

	getUserData = () => {
		fetch('https://randomuser.me/api/')
			.then(data => data.json())
			.then(data => {
				this.setState({
					user: data.results[0]
				});
			});
	};

	handlePetSelect = pet => {
		// Log user into pet array
		this.setState({
			[pet + 'People']: this.state[pet + 'People'].concat({
				name: this.state.user.name,
				picture: this.state.user.picture,
				pet: pet,
			})
		});

		// Reset to new user
		this.getUserData();
	}

	removeUser = (index, list) => {
		let newData = this.state[list + 'People'].slice(); //copy array
		newData.splice(index, 1); //remove element
		this.setState({[list + 'People']: newData}); //update state
	};

	componentDidMount() {
		this.getUserData();
	};

	render() {
		const {user} = this.state;

		if (!this.state.user) {
			return <div>No User Found</div>;
		}
		return (
			<div>
				<h3
					onClick={() => this.handlePetSelect('dog')}
					style={dogStyle}>
					Dog Person
				</h3>

				<h3
					onClick={() => this.handlePetSelect('cat')}
					style={catStyle}>
					Cat Person
				</h3>

				<UserInfo user={user} />

				<UserList list="dog" users={this.state.dogPeople} handler={this.removeUser} />

				<UserList list="cat" users={this.state.catPeople} handler={this.removeUser} />
			</div>
		);
	}
}

export default App;
