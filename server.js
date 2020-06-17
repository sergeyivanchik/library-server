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

io.on('connection', function (socket) {
  console.log('User is connected!');

  socket.on('sendToServer', comment => {
    commentsController.addComment(comment)
      .then(data => {
        socket.broadcast.emit('addComment', data);
        socket.emit('addComment', data);
      })
      .catch(err => console.log(err))
  });
});
