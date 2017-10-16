var http  = require('http');


'use strict'

const hapi = require('hapi')

const server = new hapi.Server()

server.connection({ port: 3000 })

var io = require('socket.io')(server.listener);
var fs = require('fs');

var randomNumero = 0;

var rn = require('random-number');
var gen = rn.generator({
  min:  -10
, max:  100
, integer: true
})

console.log('1');
setInterval(function(){
    // console.log('emitting ');
    randomNumero = gen();
    // console.log(randomNum);
    }, 1000);


io.on('connection', function (socket) {
    setInterval(function(){
        // console.log('emitting ');
        randomNumero = gen();
        // console.log(randomNum);
        socket.emit('randomNUM', randomNumero);
        
    }, 1000);
    console.log(randomNumero);
  });


  console.log('2');
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
   path: '/home/hazel/test_folder/01_java'
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
