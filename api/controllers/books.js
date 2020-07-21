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

const getBookById = async bookId => {
  return await Book.findById(bookId)
    .populate('author')
    .then(book => book)
    .catch(error => console.log(error));
}

const changeRating = async params => {
  const currentBook = await Book.findOne({
    _id: params.bookId,
    rates:{ $elemMatch: {user: params.userId}}
  });

  if (currentBook) {
    await Book.updateOne({
      _id: params.bookId,
      rates:{ $elemMatch: {user: params.userId}}
    },
    {
      $set : {"rates.$.rate" : params.rating}
    })
  } else {
    await Book.findOneAndUpdate({
      _id: params.bookId
    },
    {
      $push: {
        rates: {
          user: params.userId,
          rate: params.rating
        }
      }
    })
  }
};

const getBookRating = async (req, res) => {
  const currentBook = await Book.findById(req.params.bookId);

  if (!currentBook?.rates?.length) {
    res.send({ userRating: 0, averageRating: 0 })
  } else {
    const averageRating = (currentBook.rates.reduce((acc, elem) =>
      acc + elem.rate, 0
    ) / currentBook.rates.length).toFixed(1);
    const userRating = currentBook.rates.find(elem =>
      `${elem.user}` === `${req.params.userId}`
    );

    res.send({ userRating: userRating?.rate || 0, averageRating })
  };
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

// const setFollower = async (req, res) => {
//   const follower = await Book.findOne({
//     _id: req.params.bookId,
//     followers:{ $all: req.params.followerId }
//   });

//   if (!follower) {
//     await Book.findOneAndUpdate({
//       _id: req.params.bookId
//     },
//     { $push: { followers: req.params.followerId } }
//     )
//       .then(book => res.send(book))
//       .catch(error => {
//         res.status(500).send({
//           message: error.message
//         });
//         res.send(error);
//       });
//   } else {
//     await Book.updateOne({
//       _id: req.params.bookId
//     },
//     {
//       $pull: { followers: req.params.followerId }
//     })
//       .then(book => {
//         res.send(book);
//       })
//       .catch(error => {
//         res.status(500).send({
//           message: error.message
//         });
//         res.send(error);
//       });
//   }
// };

module.exports = {
  getBooks,
  addBook,
  getCurrentBook,
  getBooksByAuthor,
  changeRating,
  getBookById,
  getBookRating
}
