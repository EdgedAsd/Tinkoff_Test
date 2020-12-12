import React from "react";
import Contact from "../Contact";
import sendRequest from "../../sendRequest";
import "./contacts.css";

// Страница контактов
class Contacts extends React.Component {

	constructor(props) {
		super(props);

		this.max_contacts = 5;		// Максимальное количество отображаемых контактов

		this.state = {
			active_contact: props.user.contacts.length,						// id выбранного контакта
			isChanged: false,												// Флажок, если true => изменения были внесены, разблокировать кнопку save
			contacts: props.user.contacts,									// контакты, первоначальное значеин из props, далее изменяется пользователем
			start_contact: props.user.contacts.length-this.max_contacts		// номер в массиве контакта, с которого начинается отрисовка
		}

		this.setActiveContact = this.setActiveContact.bind(this);
		this.getInfo = this.getInfo.bind(this);
		this.saveContacts = this.saveContacts.bind(this);
		this.deleteContact = this.deleteContact.bind(this);
		this.createContact = this.createContact.bind(this);
		this.scroll = this.scroll.bind(this);
	}

	// Установить активныи контакт по id
	setActiveContact(id) {
		this.setState({active_contact: id});
	}

	// Получить данные от каждого контакта при его изменении
	getInfo(id, field, value) {
		this.setState(prevState => {
			let contacts = prevState.contacts;
			let index = contacts.findIndex(elem => (elem.id === id))
			contacts[index][field] = value;
			return {
				isChanged: true,
				contacts: contacts
			}
		})
	}

	// Сохранение данных на сервер
	saveContacts() {
		if (this.state.isChanged) {
			let data = this.props.user;
			data.contacts = this.state.contacts;
			data.contacts.forEach((elem, index) => {
				elem.id = index+1
			})
			const url = "http://localhost:4000/user";
			sendRequest(url, 'POST', data)
				.then(response => console.log(response))
				.catch(error => console.log(error));
			this.setState({isChanged: false});
		}
	}

	// Удалить контакт по id
	deleteContact(id) {
		this.setState(prevState => {
			let contacts = prevState.contacts;
			let index = contacts.findIndex(elem => (elem.id === id))
			contacts.splice(index,1);
			return {
				contacts: contacts,
				isChanged: true,
				active_contact: (contacts.length > 0) ? contacts[contacts.length-1].id : undefined
			}
		})
	}

	// Создать контакт
	createContact() {
		let new_id = this.state.contacts[this.state.contacts.length-1].id + 1
		let new_contact = {
			id: new_id,
			username: "username",
			name: "name",
			phone: "0000000"
		}

		this.setState(prevState => {
			let contacts = prevState.contacts;
			contacts.push(new_contact);
			return {
				contacts: contacts,
				active_contact: new_id,
				isChanged: true
			}
		});
	}

	// Перелистывать контакты вверх/вниз
	scroll(event) {
		let delta = event.deltaY;
		if (delta < 0) {
			if (this.state.start_contact > 0) {
				this.setState(prevState => {
					return {
						start_contact: prevState.start_contact - 1
					}
				})
			}
		}
		else {
			if (this.state.start_contact < this.state.contacts.length - this.max_contacts) {
				this.setState(prevState => {
					return {
						start_contact: prevState.start_contact + 1
					}
				})
			}
		}
	}

	render() {
		let {username, name} = this.props.user;
		let {contacts, active_contact, isChanged, start_contact} = this.state;

		let show_contacts = (contacts.length <= this.max_contacts) ? contacts : contacts.slice(start_contact, start_contact+this.max_contacts);

		let contact_items = show_contacts.map((contact,index) => {
			return (
				<Contact 
					key={contact.id}							// Обязательныи аттрибут
					id={contact.id}								// id
					user={{username: username, name: name}}		// Данные об пользователе для отображения
					name={contact.name} 						// Имя контакта
					username={contact.username} 				// Логин контакта
					phone={contact.phone}						// Телефон контакта
					number={index}								// Номер контакта из списка отрисованных - [0,4]
					active={(contact.id === active_contact)}	// Если id = id активного контакта, то отображать как активныи 
					click={this.setActiveContact}				// При нажатии на контакт сделать его активным
					getInfo={this.getInfo}						// Ф-я связка для получения данных
					deleteContact={this.deleteContact}			// Ф-я связка для аниимации удаления
				/>
			)
		});

		return (
			<section className="contacts">
				<div className="dark-wall">
					<div className="list-wrapper">
						<ul className="contact-list" onWheel={this.scroll}>
							{contact_items}
						</ul>
						<div className="contact-list-buttons">
							<button className={`contact-list-buttons__button 
												contact-list-buttons__button_save
												${!isChanged ? "contact-list-buttons__button_disabled" : ""}`}
									onClick={this.saveContacts}
							>Save</button>
							<button className="contact-list-buttons__button" onClick={this.createContact}>Create</button>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Contacts;