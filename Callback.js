function getCallback(contents) {
	var data = contents.callback_query.data;
	var chat_id = contents.callback_query.from.id;
	var message_id = contents.callback_query.message.message_id;
	var callback_id = contents.callback_query.id;

	switch (data) {
		case "uno":
		case "dos":
			edit_message(chat_id, message_id, "New value: " + data, callback_id, true, example_board);
			break;

		case "schedule_total":
			var text = scheduleTotal();
			edit_message(chat_id, message_id, text, callback_id, true, schedule_keyboard);
			break;

		case "schedule_new":
			reply_message(chat_id, 'What do you want to include?');
			answerdCallback(callback_id);
			break;
		case "schedule_delete":
			reply_message(chat_id, 'ID of the item to be deleted');
			answerdCallback(callback_id);
			break;
	}
}