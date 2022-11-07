# Telegram-bot-with-Google-Apps-Script

Example of API for telegram Bots with Google Apps Script

## How to use

To use this API you need to create a new Google Apps Script project and copy the code from the file `Code.gs` into the editor.

Then you need to create a new Telegram Bot and get the token. You can do this with the BotFather.

After that you need to set the token in the script. You can do this by replacing the string `YOUR_TOKEN` with your token.

`idCreator` is the id of the user who can use the commands. You can get your id by sending a message to the bot and then going to the url `https://api.telegram.org/botYOUR_TOKEN/getUpdates` and looking for your id in the response.

You can also set the `idCreator` to `null` or remove and then everyone can use the commands.

## TO-DO:

- Add more information about the API.
