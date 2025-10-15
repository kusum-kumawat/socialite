import { Schema, model } from "mongoose";

const ConversationSchema = new Schema({
  // Participants in the conversation
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  // Last message sent in the conversation
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  // Timestamp of the last message
  lastMessageTimestamp: Date,
  // Conversation type (direct message or group chat)
  type: {
    type: String,
    enum: ['direct', 'group'],
  },
  // Any additional conversation metadata (optional)
  unreadCount: Number,
  pinned: Boolean,
});

export const Conversation = model('Conversation', ConversationSchema);