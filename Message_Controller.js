var example_board = {
	"inline_keyboard": [
		[{
			"text": "Uno",
			'callback_data': 'uno'
		}],
		[{
			"text": "Dos",
			'callback_data': 'dos'
		}]
	]
};

function opciones(id) {

	var data = {
		method: "post",
		payload: {
			method: "sendMessage",
			chat_id: String(id),
			text: 'Elige una opcion',
			parse_mode: "HTML",
			reply_markup: JSON.stringify(example_board)
		}
	};

	UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function send_message(id, message, reply_markup = false, keyboard = null) {
	if (!reply_markup) {

		var data = {
			method: "post",
			payload: {
				method: "sendMessage",
				chat_id: String(id),
				text: message,
				parse_mode: "HTML",

			}
		};
	} else {
		var data = {
			method: "post",
			payload: {
				method: "sendMessage",
				chat_id: String(id),
				text: message,
				parse_mode: "HTML",
				reply_markup: JSON.stringify(schedule_keyboard)
			}
		};
	}

	UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function edit_message(idchat, idmsg, text, idCallback = null, reply_markup = false, keyboard = null) {
	if (idCallback != null) {
		answerdCallback(idCallback);
	}
	if (reply_markup) {
		var data = {
			method: "post",
			payload: {
				method: "editMessageText",
				chat_id: String(idchat),
				message_id: String(idmsg),
				text: text,
				parse_mode: "HTML",
				reply_markup: JSON.stringify(keyboard)
			}
		};
	} else {
		var data = {
			method: "post",
			payload: {
				method: "editMessageText",
				chat_id: String(idchat),
				message_id: String(idmsg),
				text: text,
				parse_mode: "HTML"
			}
		};
	}


	UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function reply_message(id, text) {
	var data = {
		method: "post",
		payload: {
			method: "sendMessage",
			chat_id: String(id),
			text: text,
			parse_mode: "HTML",
			reply_markup: JSON.stringify({
				"force_reply": true
			}),
		}
	};
	UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function answerdCallback(idCallback) {
	var data = {
		method: "post",
		payload: {
			method: "answerCallbackQuery",
			callback_query_id: idCallback,
			parse_mode: "HTML",

		}
	};

	UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

function delete_message(id_chat, id_message) {
	var data = {
		method: "post",
		payload: {
			method: "deleteMessage",
			chat_id: String(id_chat),
			message_id: String(id_message),
			parse_mode: "HTML",

		}
	};

	UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}

