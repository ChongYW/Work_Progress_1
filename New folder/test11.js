// This function is to get telegram bot message with newest data with specific status_code.

const { MongoClient } = require('mongodb');

const { sendMessageToChannel } = require('./test7(bot)'); // Adjust the path accordingly

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const botToken = '';

// Replace 'YOUR_CHANNEL_CHAT_ID' with the channel chat ID.
// or use chat ID if you have it, remember add '-100' at the head of your channel id!
const channelChatId = '';

// MongoDB connection URI and database name
const uri = ''; // Update with your MongoDB URI
const dbName = ''; // Update with your database name

// Initialize the latestCreatedAt to the current time or a specific starting time
let latestCreatedAt = new Date('2023-09-25T00:05:42.710+00:00');

// Function to check for data with status_code 200
async function checkData() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);

    const cursor = db.collection('').find({
      status_code: 200,
      created_at: { $gt: latestCreatedAt },
    });

    const data = await cursor.toArray();

    if (data.length > 0) {
      data.forEach((item) => {
        console.log(`ID: ${item._id} \nstatus_code: ${item.status_code}\n..........`);

        sendMessageToChannel(botToken, channelChatId, `ID: ${item._id} \nStatus code: ${item.status_code}`);

        // Update the latestCreatedAt to the timestamp of the latest processed data
        latestCreatedAt = item.created_at;
      });
    } else {
      console.log('No data with specific status_code yet...');
    }

    await client.close();
  } catch (err) {
    console.error('Error:', err);
  }
}

// Interval to check for new data every 3 seconds
setInterval(checkData, 3000);
