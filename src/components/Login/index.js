import React from "react";
import sendRequest from "../../sendRequest";
import FormField from "../FormField";
import "./login.css";


// Форма входа
class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: "",			// Значение поля username
			password: "",			// Значение поля password
			phone: "",				// Значение поля name
			incorrect_data: false	// Флажок, если true => показать предупреждение
		}

		this.getInfo = this.getInfo.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		event.preventDefault();		// Сброс стандартнои реакции
		let {password, phone, username} = this.props.user;
		if ((password === this.state.password)&&(phone === this.state.phone)&&(username === this.state.username)) {		// Проверка корректности данных
			this.setState({incorrect_data: false});
			
			window.location.assign('/');	// Показывает, какои путь необходимо прописать в url

			let body = this.props.user;
			body.logged = true;

			const url = "http://localhost:4000/user";
			sendRequest(url, 'POST', body)					// Отправка результата успешного входа
				.then(response => console.log(response))
				.catch(error => console.log(error))
		}
		else {
			this.setState({incorrect_data: true})
		}
	}

	getInfo(field, value) {
		this.setState({
			[field]: value
		});
	}

	//

	render() {
		return (
			<div className="form-wrapper">
				<h2 className="title">Log&nbsp;In</h2>
				<form className="form">
					<FormField holder="Username" field="username" getInfo={this.getInfo} />
					<FormField holder="Phone" field="phone" getInfo={this.getInfo} />
					<FormField holder="Password" field="password" getInfo={this.getInfo} type="password"/>
					<input className="form__submit" onClick={this.handleClick} type="submit" value="Log In" />
					{this.state.incorrect_data ? <p className="form__warning">Incorrect data!</p> : null}
				</form>
			</div>
		);
	}
}

export default Login;