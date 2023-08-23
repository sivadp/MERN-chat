const Conversation = require('./models/conversation'); // Import your Conversation model

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', async (data) => {
      try {

        // Find or create the conversation
        let conversation = await Conversation.findOne({
          $or: [
            { 'participants.part1': data.sender, 'participants.part2': data.receiver },
            { 'participants.part1': data.receiver, 'participants.part2': data.sender },
          ],
        });

        if (!conversation) {
          // Create a new conversation if it doesn't exist
          conversation = new Conversation({
            participants: {
              part1: data.sender,
              part2: data.receiver,
            },
            part1msg: [],
            part2msg: [],
          });
        }

        // Add the new message to the appropriate participant's messages array
        if (conversation.participants.part1 === data.sender) {
          conversation.part1msg.push({
            sender:data.sender,
            message: data.message,
            timestamp: new Date(),
          });
        } else {
          conversation.part2msg.push({
            sender:data.sender,
            message: data.message,
            timestamp: new Date(),
          });
        }

        // Save the updated conversation
        await conversation.save();

        // Emit the message to all connected clients
        io.emit('chat message', data);

      } catch (error) {
        console.error('Error handling chat message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};
