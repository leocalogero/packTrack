import React from 'react';
import firebase from './firebase.js';

class Todo extends React.Component {
	constructor() {
		super();
		this.state = {
			todos: [],
			todo: "",
			description: "",
			timestamp: ""
		}
		this.handleChange = this.handleChange.bind(this);
		this.addTodo = this.addTodo.bind(this);
		this.removeTodo = this.removeTodo.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	addTodo(event) {
		event.preventDefault();
		let description = this.state.todo;
		let timestamp = new Date().toString();
		const todo = {
			description,
			timestamp,
		}
		const bag = this.props.bagId;
		const bagRef = firebase.database().ref(`/items/${bag}/items`);
		bagRef.push(todo);
	}

	removeTodo(keyToRemove, bag) {
		console.log(keyToRemove, bag);
		const itemRef = firebase.database().ref(`/items/${bag}/items/${keyToRemove}`);
		itemRef.remove();
	}

	render() {
		return (
			<div className='todoForm'>
				<form className='todoFormButton' onSubmit={this.addTodo}>
					<input placeholder="Ex. Laptop, wallet, iPod" type="text" name="todo" value={this.state.todo} onChange={this.handleChange}/>
					<button>Add Item</button>
				</form>
				<ul>
					{this.props.items.map(item => {
						return (
							<TodoItem item={item} key={item.key} remove={this.removeTodo} bagId={this.props.bagId} />
						);
					})}
				</ul>
			</div>
			)
		}
	}

const TodoItem = (props) => {
	console.log(props);
	return (
		<li>
			<span className='bagItemDescription'>{props.item.contents.description}</span>
			<span className='bagItemTimeStamp'>{props.item.contents.timestamp}</span>
			<div className='bagItemButton'>
				<button onClick={() => props.remove(props.item.key, props.bagId)}>x</button>
			</div>
		</li>
	)
}

export default Todo;