import mongoose, { Schema } from "mongoose";

// const MessageSchema = new Schema({
//   // User who sent the message
//   sender: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   // Recipient of the message (or multiple users for group chats)
//   recipients: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   ],
//   // Content of the message
//   content: {
//     type: String,
//     required: true,
//   },
//   // Timestamp of the message
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
//   // Message type (text, image, video, etc.)
//   type: {
//     type: String,
//     enum: ["text", "image", "video", "other"],
//   },
//   // Additional message properties (optional)
//   seen: {
//     type: Boolean,
//     default: false,
//   },
//   delivered: {
//     type: Boolean,
//     default: false,
//   },
//   mediaUrl: String,
//   // etc.
// });

const MessageSchema = new Schema({
  // Reference to the conversation this message belongs to
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  // Sender of the message
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Content and other message properties as in the single schema approach
  // ...
});

const Message = mongoose.model("Message", MessageSchema);
