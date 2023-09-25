// This NodeJS file is to send Telergram message to user via bot, its modify as a exports functions.

const TelegramBot = require('node-telegram-bot-api');

function sendMessageToChannel(botToken, channelChatId, message) {
  // Create a new instance of the TelegramBot
  const bot = new TelegramBot(botToken, { polling: true });

  // Send a message to the channel
  bot.sendMessage(channelChatId, message)
    .then(() => {
      console.log('Message sent to the channel successfully');
    })
    .catch((error) => {
      console.error('Error sending message to the channel:', error);
    });
}

module.exports = { sendMessageToChannel };
