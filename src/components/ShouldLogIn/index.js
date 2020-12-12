import React from "react";
import './should_log_in.css';


// Требование залогиниться при попытке просмотра контактов
export default function ShouldLogIn(props) {
	return (
		<div className="locked">
			<div className="image"></div>
			<p className="description">You should to <a href="/login">log&nbsp;in</a> for getting access to your contacts.</p>
		</div>
	)
}