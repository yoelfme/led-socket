var express = require('express.io');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var five = require("johnny-five");

var board = new five.Board();

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.http().io();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.io.on('connection', function (socket){
    console.log('client: ',socket.id);
});

app.io.route('hi', function(req){
        console.log('cliente dice hola!');
        app.io.broadcast('hi server', {socketId: req.socket.id});
    });


board.on("ready", function() {
    var led = new five.Led(13);
    var async = null;
    app.io.route('encender', function( req ){
      var tiempo = req.data.tiempo;
      led.on();
      if(tiempo){
        async = setTimeout(function(){
          led.off();
        },tiempo*1000);
      }
    });

    app.io.route('apagar',function(req){
      led.off();
      if (async)
        clearTimeout(async);
    })
});

// app.listen(8000, function(){
//     console.log("Servidor Express.io listo.");
// });
module.exports = app;
