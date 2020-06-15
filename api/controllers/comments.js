const mongoose = require('mongoose');
Comment = mongoose.model('Comment');


const getCommentsByBook = async (req, res) => {
  await Comment.find({ book: req.params.bookId })
    .populate('user')
    .populate('book')
    .then(comments => res.send(comments))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
      res.send(error);
    });
};

const addComment = async (req, res) => {
  const newComment = await new Comment(req.body);
  newComment.save()
    .then(comment => res.send(comment))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
      res.send(error);
    });
};

module.exports = {
  getCommentsByBook,
  addComment
}
