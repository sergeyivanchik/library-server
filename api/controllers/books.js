const mongoose = require('mongoose');
Book = mongoose.model('Book');


const getBooks = async (req, res) => {
  await Book.find()
    .populate('author')
    .then(books => res.send(books))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
    });
};

const addBook = async (req, res) => {
  const newBook = await new Book(req.body);
  newBook.save()
    .then(book => res.send(book))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
      res.send(error);
    });
};

const getCurrentBook = async (req, res) => {
  await Book.findById(req.params.id)
    .populate('author')
    .then(book => res.send(book))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
      res.send(error);
    });
};

const getBooksByAuthor = async (req, res) => {
  await Book.find({ author: req.params.authorId })
    .then(books => res.send(books))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
      res.send(error);
    });
};

const setFollower = async (req, res) => {
  const follower = await Book.findOne({
    _id: req.params.bookId,
    followers:{ $all: req.params.followerId }
  });

  if (!follower) {
    await Book.findOneAndUpdate({
      _id: req.params.bookId
    },
    { $push: { followers: req.params.followerId } }
    )
      .then(book => res.send(book))
      .catch(error => {
        res.status(500).send({
          message: error.message
        });
        res.send(error);
      });
  } else {
    await Book.updateOne({
      _id: req.params.bookId
    },
    {
      $pull: { followers: req.params.followerId }
    })
      .then(book => {
        res.send(book);
      })
      .catch(error => {
        res.status(500).send({
          message: error.message
        });
        res.send(error);
      });
  }
};

module.exports = {
  getBooks,
  addBook,
  getCurrentBook,
  getBooksByAuthor,
  // setFollower
}
