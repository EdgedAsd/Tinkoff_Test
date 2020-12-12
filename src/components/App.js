import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import sendRequest from "../sendRequest";

import Login from "./Login";
import Contacts from "./Contacts";
import ShouldLogIn from "./ShouldLogIn";

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		const url = "http://localhost:4000/user";
		sendRequest(url, 'GET').then(response => this.setState(JSON.parse(JSON.stringify(response)))); 	// Получение всех данных пользователя с сервера
	}

	render() {
		return (
			<Router>
				<Switch>
					{(this.state.logged) ? <Route exact path="/" render={() => <Contacts user={this.state} />} /> : <Route exact path="/" component={ShouldLogIn} />}
					<Route exact path="/login" render={() => <Login user={this.state} />} />
				</Switch>
			</Router>
		);
	}
}

export default App;