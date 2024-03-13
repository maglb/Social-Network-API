const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUsers,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController.js");

// /api/users
router.route("/")
.get(getUsers)
.post(createUser);

// /api/users/:userId
router.route("/:userId")
.get(getSingleUser)
.put(updateUsers)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId")
.post(addFriend)
.delete(deleteFriend);

module.exports = router;