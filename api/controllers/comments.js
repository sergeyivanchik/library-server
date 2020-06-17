const mongoose = require('mongoose');
Comment = mongoose.model('Comment');


const getCommentsByBook = async (req, res) => {
  await Comment.find({ book: req.params.bookId })
    .populate('user', 'username')
    .populate('book')
    .then(comments => res.send(comments))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
      res.send(error);
    });
};

const addComment = async (comment) => {
  const newComment = await new Comment(comment);
  return newComment.save()
    .then(data => getCommentById(data.id))
    .catch(error => console.log(error));
};

const getCommentById = async (commentId) => {
  return await Comment.findById(commentId)
    .populate('user', 'username')
    .then(data => data)
    .catch(error => console.log(error));
};

module.exports = {
  getCommentsByBook,
  addComment,
  getCommentById
}
