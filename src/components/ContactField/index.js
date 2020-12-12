import React from "react";
import "./contact_field.css";

// Поле ввода для контакта
export default class ContactField extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value	// Значение поля
		}

		this.handleChange = this.handleChange.bind(this);
		this.save = this.save.bind(this);
	}

	// При изменении данных проверить на соответствие шаблону и записать в state
	handleChange(event) {
		if (this.props.template) {
			if (event.target.value !== "") {
				this.setState({value: event.target.value.match(this.props.template).join('')});
			}
			else {
				this.setState({value: ''});
			}
		}
		else {
			this.setState({value: event.target.value});
		}
	}

	// Если новое значение не равно старому то сохранить и вызвать callback для контакта, при расфокусировке поля
	save() {
		if (this.props.value !== this.state.value) {
			this.props.save(this.props.name,this.state.value);
		}
	}

	render() {
		return (
			<input 
				onChange={this.handleChange} 
				value={this.state.value} 
				className='contact__field'
				onBlur={this.save}
			/>
		);
	}
}