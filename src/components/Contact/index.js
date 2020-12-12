import React from "react";
import "./contact.css";
import ContactField from "../ContactField";

// Контакт-конверт
class Contact extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			edit: false,		// Режим редактирования on/off
			hide: false			// Показ анимации удаления
		}

		this.handleClick = this.handleClick.bind(this);
		this.saveField = this.saveField.bind(this);
		this.deleteContact = this.deleteContact.bind(this);
	}

	// Деиствие при нажатии на контакт
	handleClick(event) {
		this.props.click(this.props.id);
	}

	// Деиствие при нажатии кнопки save
	saveField(field, value) {
		this.props.getInfo(this.props.id, field, value);
	}

	// Деиствие при нажатии кнопки delete
	deleteContact() {
		this.setState({hide: true});
		let deleteTimer = setTimeout(() => this.props.deleteContact(this.props.id), 600);
	}

	render() {
		let {edit, hide} = this.state;
		let {active, number, user, username, name, phone} = this.props;

		let style = {
			top: `${number*100 + 50}px`,
			left: hide ? "1000px" : `${number*50}px`,
			opacity: hide ? '0.5' : '1',
		}

		return (
			<li className={`contact-item ${active ? "active" : ""}`} style={style} onClick={this.handleClick}>
				<p className="contact-item__names">
					From:<br />
					<b>{edit ? <ContactField value={name} name="name" save={this.saveField}/> : name}</b><br />
					<b>@{edit ? <ContactField value={username} name="username" save={this.saveField}/> : username}</b><br /><br />
					To:<br />
					<b>{user.name}</b><br />
					<b>@{user.username}</b>
				</p>
				<p className="contact-item__phone">
					<b>Phone: </b><br />
					<span className="contact-item__phone_number">{edit ? <ContactField value={phone} name="phone" save={this.saveField} template={/\d/g}/> : phone}</span>
				</p>
				<div className="contact-buttons" style={{display: edit ? "none" : "flex"}}>
					<button className="contact-buttons__btn_edit contact-buttons__btn" onClick={() => this.setState({edit:true})}>Edit</button>
					<button className="contact-buttons__btn_delete contact-buttons__btn" onClick={this.deleteContact}>Delete</button>
				</div>
				<button className="contact-buttons__btn_save contact-buttons__btn" style={{display: edit ? 'block' : 'none'}} onClick={() => this.setState({edit: false})}>Save</button>
				<div className="dark-wall_absolute"></div>
			</li>
		);
	}
}

export default Contact;