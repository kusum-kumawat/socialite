import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 2200,
    },

    media_url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "video"],
    },
    likes: {
      type: Number,
      default: 0,
    },
    hashtags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    // tags: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  // Extract hashtags from caption and store them as lowercase in the hashtags array
  const text = this.caption || "";
  this.hashtags = text.match(/#(\w+)/g) || [];
  this.hashtags = this.hashtags.map((tag) => tag.toLowerCase());
  next();
});

export const Post = mongoose.model("Post", postSchema);
