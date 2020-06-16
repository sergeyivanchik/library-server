const mongoose = require('mongoose');
Author = mongoose.model('Author');


const getAuthors = async (req, res) => {
  await Author.find()
    .then(authors => res.send(authors))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
    });
};

const addAuthor = async (req, res) => {
  const newAuthor = await new Author(req.body);
  newAuthor.save()
    .then(author => res.send(author))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
      res.send(error);
    });
};

const getCurrentAuthor = async (req, res) => {
  await Author.findById(req.params.id)
    .then(author => res.send(author))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
      res.send(error);
    });
};

module.exports = {
  getAuthors,
  addAuthor,
  getCurrentAuthor
}
