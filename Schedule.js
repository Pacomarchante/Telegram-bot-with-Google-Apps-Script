var schedule_keyboard = {
	"inline_keyboard": [
		[{
			"text": "Nueva entrada",
			'callback_data': 'schedule_new'
		}],
		[{
			"text": "Ver entradas",
			'callback_data': 'schedule_total'
		}],
		[{
			"text": "Borrar entrada",
			'callback_data': 'schedule_delete'
		}]
	]
};

function schedule(id) {

	send_message(id, 'Sistema de apuntes:', true, schedule_keyboard);

}


function replyPost(contents) {
	var id = contents.message.chat.id;
	var text = contents.message.text;
	var response = contents.message.reply_to_message.text;

	if (response == "¿Que quieres inlcuir?") {
		var spread_sheet = SpreadsheetApp.openById(sodabotSheet).getSheetByName('Agenda');
		spread_sheet.appendRow([new Date(), id, text]);
	} else if (response == "ID del elemento a eliminar") {
		var spread_sheet = SpreadsheetApp.openById(sodabotSheet).getSheetByName('Agenda');
		spread_sheet.deleteRow(parseInt(text) + 1);
	}
	// delete_message(id, contents.message.message_id);
	// delete_message(id, contents.message.reply_to_message.message_id);
	send_message(id, scheduleTotal(), true, schedule_keyboard);
}

function scheduleNew(id) {
	var send = {
		method: "post",
		payload: {
			method: "sendMessage",
			chat_id: String(id),
			text: '¿Que quieres inlcuir?',
			parse_mode: "HTML",
			reply_markup: JSON.stringify({
				"force_reply": true
			}),
		}
	};
	UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', send);
}

function scheduleTotal() {
	var spread_sheet = SpreadsheetApp.openById(sodabotSheet).getSheetByName('Agenda');
	var values = spread_sheet.getRange("C1:C").getValues();

	var message = "Listado de apuntes: \n";
	for (var i = 0; i < values.length; i++) {
		if (values[i][0] === "") {
			break;
		}
		message += i + " - " + values[i][0] + "\n";
	}
	return message;

}

function scheduleDelete(id) {
	var send = {
		method: "post",
		payload: {
			method: "sendMessage",
			chat_id: String(id),
			text: 'ID del elemento a eliminar',
			parse_mode: "HTML",
			reply_markup: JSON.stringify({
				"force_reply": true
			}),
		}
	};
	UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', send);
}







