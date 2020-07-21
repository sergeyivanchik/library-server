const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const jsonParser = express.json();
const cors = require('cors');
const toJson = require('@meanie/mongoose-to-json');
const io = require('socket.io')(server);
const port = require('./api/configs/port').port;


mongoose.plugin(toJson);

require('./api/utils/db.js').setUpConnection();
require('./api/models/book');
require('./api/models/author');
require('./api/models/selectedBooks');
require('./api/models/user');
require('./api/models/comment');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(jsonParser);

app.use('/',require('./api/routes/index'));

require('./api/passport/jwt.js');

server.listen(port, () => console.log('port', port));

const commentsController = require('./api/controllers/comments');
const booksController = require('./api/controllers/books');

io.on('connection', function (socket) {
  console.log('User is connected!');

  socket.on('sendCommentToServer', comment => {
    commentsController.addComment(comment)
      .then(data => {
        socket.broadcast.emit('addComment', data);
        socket.emit('addComment', data);
      })
      .catch(err => console.log(err))
  });

  socket.on('sendRatingToServer', async params => {
    await booksController.changeRating(params);
    await booksController.getBookById(params.bookId)
    .then(data => {
      const averageRating =
        data.rates?.length &&
        (data.rates.reduce((acc, elem) => acc + elem.rate, 0) / data.rates.length).toFixed(1);

      socket.broadcast.emit('getRating', { averageRating: averageRating || 0 });
      socket.emit('getRating', { averageRating: averageRating || 0 });
    })
    .catch(err => console.log(err))
  });
});
