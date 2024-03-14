const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  //   createReaction,
  //   deleteReaction,
} = require("../../controllers/thoughtController.js");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// // /api/thoughts/:thoughtId/reactions
// router
//   .route("/:thoughtId/reactions")
//   .post(createReaction)
//   .delete(deleteThought);

// // /api/thoughts/:thoughtId/reactions/:reactionId
// router
//   .route("/:thoughtId/reactions/:reactionId")
//   .delete(deleteReaction);

module.exports = router;
