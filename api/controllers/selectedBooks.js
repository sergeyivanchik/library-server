const mongoose = require('mongoose');
SelectedBooks = mongoose.model('SelectedBook');


const addBook = async (req, res) => {
  const isSelected = await SelectedBooks.findOne({
    user: req.params.userId,
    book: req.params.bookId
  });

  if (!isSelected) {
    const newSelectedBook = await new SelectedBooks(
      {
        user: req.params.userId,
        book: req.params.bookId
      }
    );
    newSelectedBook.save()
      .then(() => res.send(true))
      .catch(error => {
        res.status(500).send({
          message: error.message
        });
        res.send(error);
      });
  } else {
    await SelectedBooks.findOneAndDelete({
      user: req.params.userId,
      book: req.params.bookId
    })
      .then(() => res.send(false))
      .catch(error => {
        res.status(500).send({
          message: error.message
        });
        res.send(error);
      });
  }
};

async function checkSelectedBook(req, res) {
  await SelectedBooks.findOne({
    user: req.params.userId,
    book: req.params.bookId
  })
    .then(selectedBook => res.send(selectedBook))
    .catch(error => {
      res.status(500).send({
        message: error.message
      });
    });
};

module.exports = {
  addBook,
  checkSelectedBook
}
