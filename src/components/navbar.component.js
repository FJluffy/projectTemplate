import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

const Navbar = props => {
		const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

	const onClickLogoutHandler = () => {
		//I only can do this for now
		window.location.href = '/'

	////If there is cookies on website can use this function
	//AuthService.logout().then(data => {
	//	if (data.success) {
	//		setUser(data.user);
	//		setIsAuthenticated(false);
	//	}
	//});
}
const unauthenticatedNavBar = () => {
	return (
		<>
			<li className="navbar-item">
				<Link to="/" className="nav-link">Details</Link>
			</li>
			<li className="navbar-item">
				<Link to="/login" className="nav-link">Login</Link>
			</li>
			<li className="navbar-item">
				<Link to="/register" className="nav-link">Register</Link>
			</li>
		</>
	)
}

const authenticatedNavBar = () => {
	return (
		<>
			{
				user.role === "user" ?
					<li className="navbar-item">
						<Link to="/" className="nav-link">Details</Link>
					</li> :null
            }
			{
				user.role === "admin" ?
					<li className="navbar-item">
						<Link to="/admin" className="nav-link">Edit Details</Link>
					</li> : null
			}
			{
				user.role === "admin" ?
					<li className="navbar-item">
						<Link to="/create" className="nav-link">Create Details</Link>
					</li> : null
			}
			<button type="button" className="btn btn-link anv-item nav-link"
				onClick={onClickLogoutHandler}>Logout</button>
		</>
	)
}
		return (
			<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
				<Link to="/" className="navbar-brand">JX3 Accounts</Link>
				<div className="collpase navbar-collapse">
					<ul className="navbar-nav mr-auto">
						{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
					</ul>
				</div>
			</nav>
		);
}

export default Navbar;