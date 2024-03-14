const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // add getter to format the timestamp on query look more into LocaleString and LocaleDateString
      get: (value) => new Date(value).toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    //Array of nested documents created with the reactionSchema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtual: true,
      getter: true, // research
    },
  }
);

// Create a virtual property `reactionCount` that gets the amount of reaction the thought has
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
