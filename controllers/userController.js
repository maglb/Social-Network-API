const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

module.exports = {
  // Get all user
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .select("-__v")
        .populate({ path: "friends", select: "_id username friends" })
        .populate("thoughts");
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({
        _id: req.params.userId,
      })
        .select("-__v")
        .populate("friends")
        .populate("thoughts");

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user was found with that ID" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //update user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user was found with this id!" });
      }

      res.json({ message: "User successfully updated" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to a user
  async addFriend(req, res) {

    try {
      const friend = await User.findOne({
        _id: req.params.friendId,
      });

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No user was found with that ID :(" });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json({
        message: "A new friend has been added to your friend's list",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove friend from a user
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
