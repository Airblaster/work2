
var express = require('express');
var app = express();

var server = app.listen(3000);
//var app = require('express')();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);

var io = require('socket.io').listen(server);

var port = process.env.PORT || 3000;
var path = require('path');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));


var indexRouter = require('./routes/index');
app.use('/', indexRouter);



io.on('connection', function(socket){
	console.log('NEW socket connect');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

/*http.listen(port, function(){
  console.log('listening on *:' + port);
});*/
