import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.js';
import Form from './Form.js';
import Todo from './Todo.js';
import firebase, { auth, provider } from './firebase.js';

const dbRef = firebase.database().ref('/items');

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			bagName: '',
			bagType: '',
			items: [],
			user: null,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.clearBagForm = this.clearBagForm.bind(this);
	}
	login() {
		auth.signInWithPopup(provider)
			.then((result) => {
				this.setState({
					user: result.user,
				});
			});
	}
	logout() {
		auth.signOut()
			.then(() => {
				this.setState({
					user: null,
				});
			});
	}
	removeItem(key) {
		const itemRef = firebase.database().ref(`/items/${key}`);
		itemRef.remove();
	}
	handleSubmit(event) {
		event.preventDefault();
		const newItem = {
			bagItem: this.state.bagType,
			user: this.state.bagName,
		};
    dbRef.push(newItem);
    this.clearBagForm();
  }
  
  clearBagForm() {
    this.setState({
      bagName: '',
			bagType: ''
    });
  }

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	componentDidMount() {
		dbRef.on('value', (snapshot) => {
			const newItemsArray = [];
			const firebaseItems = snapshot.val();
			for (let key in firebaseItems) {
				const firebaseItem = firebaseItems[key];
				firebaseItem.id = key;
				let items = [];
				for (let item in firebaseItems[key].items) {
					items.push({
						contents: firebaseItems[key].items[item],
						key: item,
					});
				}
				firebaseItem.items = items;
				newItemsArray.push(firebaseItem);
			}
			this.setState({
				items: newItemsArray,
			});
			/*iterate over the object, the word key can be anything but corresponds to each of the properties inside of the object*/
		});
	}
	render() {
		return (
			<div className='app'>
				<Header user={this.state.user} login={this.login} logout={this.logout} />
				{this.state.user ?
					<div>
						<div className='user-profile'>
							<img src={this.state.user.photoURL} />
						</div>
					</div>
					:
					<div className='wrapper'>
					</div>
				}
				<div className='wrapper'>
					<Form 
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						bagName={this.state.bagName}
						bagType={this.state.bagType}
						/> 
			 		{/*this makes the app component handle change method available inside of the form component via props, the handleChange prop is exposing the handle change method so that it can be made available inside of the form component*/}
				</div>
				<div className='wrapper'>
					<section className='display-item'>
						<ul>
							{this.state.items.map((item) => {
								return (
									<li key={item.id}>
										<div className='display-item-box'>
											<h3>{item.bagItem}</h3>
											<p>{item.user}</p>
										</div>
										<Todo bagId={item.id} items={item.items || []} />
										<button onClick={() => this.removeItem(item.id)}>Remove Bag</button>
									</li>
								);
							})}
						</ul>
					</section>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

