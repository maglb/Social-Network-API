const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

// Schema to create reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
      default: () => new ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dayjs(createdAt).format("MMM D, YYYY at h:mm A")
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    _id: false,
  }
);

module.exports = reactionSchema;
