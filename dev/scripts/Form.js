import React from 'react';

class Form extends React.Component {
	render() {
		return (
			<section>
				<form onSubmit={this.props.handleSubmit} className='addBag'>
					<div className="bagType">
						<h3>type</h3>
						<input type="text" name="bagType" placeholder="Ex. School, work, gym" onChange={this.props.handleChange} value={this.props.bagType} />
					</div>
					<div className="bagName">
						<h3>name</h3>
						<input type="text" name="bagName" placeholder="Ex. Fjallraven, Goodlife Bag" onChange={this.props.handleChange} value={this.props.bagName} />
						{/*Now accesible because of the props of the component*/}
					</div>
					<button>Add Bag</button>
				</form>
			</section>
		);
	}
}

export default Form;