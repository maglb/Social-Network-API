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
    },
  }
);

// Create a virtual property `reactionCount` that gets the amount of reaction the thought has
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
reactionSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});


module.exports = reactionSchema;
