const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");
const { ObjectId } = require("mongodb");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // email validator
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    thoughts: [{ type: ObjectId, ref: "thought" }],
    friends: [{ type: ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      virtual: true,
    },
  }
);

// Create a virtual property `friendCount` that gets the amount of friends the user has
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
