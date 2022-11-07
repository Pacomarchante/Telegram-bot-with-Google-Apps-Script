var token = "YOUR_TOKEN";
var telegram_url = "https://api.telegram.org/bot" + token;
var sodabotSheet = "Spreadsheet_ID";
var idCreator = 'ID unique Telegram user';

function doGet(e) {

	return HtmlService.createHtmlOutput('Hello, world!');

}

function doPost(e) {
	var contents = JSON.parse(e.postData.contents);
	var spread_sheet = SpreadsheetApp.openById(sodabotSheet).getSheetByName('Mensajes');

	if (contents.callback_query) {
		spread_sheet.appendRow([new Date(), "Callback", contents]);
		getCallback(contents);
		// schedulePost(contents.callback_query.from.id,contents.callback_query.data)
		// cambiar(contents.callback_query.from.id, contents.callback_query.message.message_id, contents.callback_query.data, contents.callback_query.id);
	} else if (contents.message.reply_to_message) {
		spread_sheet.appendRow([new Date(), "Reply", contents]);

		replyPost(contents);
	} else {
		spread_sheet.appendRow([new Date(), "Message", contents]);

		var id = contents.message.chat.id;
		if (id == idCreator ) {

			readCommand(id, contents);
		} else {
			send_message(id, "I am not allowed to talk to youI can't t.");
			return true;
		}
	}

}

function readCommand(id, contents) {
	var text = contents.message.text;
	var name = contents.message.chat.first_name;
	text = text.toLowerCase();
	switch (text) {
		case '/start':
			send_message(id, "Hi " + name);
			break;

		case 'nombre':
			send_message(id, name);
			break;
		case 'id':
			send_message(id, id);
			break;
		case '/agenda':
			if (id == idCreator) {
				schedule(id);
			} else {
				send_message(id, "Your user does not have permissions for this command.");
			}
			break;
		case '/opciones':
			opciones(id);
			break;
		default:
			send_message(id, "I didn't understand you");
	}
}

