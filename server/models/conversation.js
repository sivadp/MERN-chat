const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: {
    part1: String,
    part2: String,
  },
  part1msg: [{
    sender:String,
    message: String,
    timestamp: Date,
  }],
  part2msg: [{
    sender:String,
    message: String,
    timestamp: Date,
  }],
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
