const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

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
      // add getter to format the timestamp on query
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
