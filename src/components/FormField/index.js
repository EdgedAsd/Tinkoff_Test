import React from "react";
import "./form_field.css";

// Поле ввода для формы
export default class FormField extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''		// Значение поля
		}

		this.handleChange = this.handleChange.bind(this);
	}

	// При изменении данных записать в state и вызввать callback для формы
	handleChange(event) {
		let value = event.target.value;
		this.setState({value: value});
		this.props.getInfo(this.props.field, value);
	}

	render() {
		return (
			<input type={this.props.type} placeholder={this.props.holder} onChange={this.handleChange} value={this.state.value} className="form__field"/>
		);
	}
}