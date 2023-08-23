const Conversation = require('./models/conversation'); // Import your Conversation model

const fetchChatHistory = async (loggedUserId, userId) => {
  try {
    // Find an existing conversation or create a new one if it doesn't exist
    let conversation = await Conversation.findOne({
      $or: [
        { 'participants.part1': loggedUserId, 'participants.part2': userId },
        { 'participants.part1': userId, 'participants.part2': loggedUserId },
      ],
    });

    if (!conversation) {
      // Create a new conversation
      conversation = new Conversation({
        participants: {
          part1: loggedUserId,
          part2: userId,
        },
        part1msg: [],
        part2msg: [],
      });
      await conversation.save();
    }

    // Combine and sort the messages from both participants
    const allMessages = [
      ...conversation.part1msg,
      ...conversation.part2msg,
    ].sort((a, b) => a.timestamp - b.timestamp);

    return allMessages;
  } catch (error) {
    throw error;
  }
};


module.exports = { fetchChatHistory };