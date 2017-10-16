var http  = require('http');


'use strict'

const hapi = require('hapi')

const server = new hapi.Server()

server.connection({ port: 3000 })

var io = require('socket.io')(server.listener);
var fs = require('fs');
var gps = {
             lat: null,
             lng: null,
};
var randomNum;

var rn = require('random-number');
var gen = rn.generator({
  min:  -10
, max:  100
, integer: true
})

setInterval(function(){
    console.log('emitting ');
    randomNum = gen();
    console.log(randomNum);
    }, 3000);


// io.on('connection', function (socket) {
//   socket.on('lamppost_dimmer', function (data) {
//       socket.emit('ui_status', data);
//   });
// });


io.on('connection', function (socket) {
    
    socket.emit('randomNum', randomNum);
    console.log('emitted')
  });


// To surf webpage
server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

server.route({
 method: 'GET',
 path: '/{file*}',
 handler: {
  directory: {
   path: '/home/hazel/LPC2'
  }
 }
})

server.start(function (err) {
  if (err) {
    throw err
  }

  console.log('Server running at: ',server.info.uri)
})
});