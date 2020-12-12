
// Ф-я доступа к серверу методами GET, POST
export default function sendRequest(url, method, body) {
	const headers = {
		'Content-Type': 'application/json'
	}

	return fetch(url, {
		method: method,
		body: JSON.stringify(body),
		headers: headers
	}).then(response => (response.ok) ? response.json() : new Error("Ooops..."))
}