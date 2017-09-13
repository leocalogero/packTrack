import React from 'react';

const Header = (props) => {
	return (
		<div>
			<div>
				<nav>
					<div className='wrapper'>
						<div className='navBox'>
						<img src="dev/images/backpackLogo1.svg" />
							{props.user ?
							<button onClick={props.logout}>Logout</button>
							:
							<button onClick={props.login}>Log In</button>
							}
						</div>
					</div>
				</nav>
			</div>
			<div>
				<header>
					<div className='wrapper'>
						<h1>track what you pack</h1>
						<h2>keep tracking everything you're packing</h2>
						<p>A simple app to continously track all your packs. Pack Track stores and stamps all the contents of your bags in realtime. Simply add a bag, name it and start tracking your stuff!.</p>
					</div>
				</header>
				</div>
		</div>
	)
}

export default Header;
