const { User, reactionSchema, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).populate("reactions");

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought was found with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but no user was found with that ID",
        });
      }

      res.json("Thought has been created 🎉");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        res.status(404).json({ message: "No thought was found with this id!" });
      }

      // await Student.deleteMany({ _id: { $in: course.students } });
      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought was found with this id!" });
      }

      res.json({ message: "Thought successfully updated" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a reaction
  async createReaction(req, res) {
    try {
      // const reaction = await reactionSchema.create(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $addToSet: { reaction: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No thought was found with that ID",
        });
      }

      res.json("Reaction has been created 🎉");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const reaction = await reactionSchema.findOneAndDelete({
        _id: req.params.reactionId,
      });

      if (!reaction) {
        res.status(404).json({ message: "No reaction was found with this id!" });
      }
      res.json({ message: "Reaction successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
