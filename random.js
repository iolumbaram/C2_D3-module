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

var rn = require('random-number');
var gen = rn.generator({
  min:  -1000
, max:  1000
, integer: true
})
gen() // example outputs → -350 

server.route({
  method: 'POST',
  path: '/gps_lat',
  handler: function (request, reply) {
    const body = request.payload.lat
    const response = reply(`You sent: ${body} to Hapi`)
   //console.log(JSON.stringify(request.headers));
   //console.log(body);
   //console.log(body);
    response.header('Content-Type', 'text/plain')
    gps.lat = body;
    io.sockets.emit('gps', gps);
}
});

io.on('connection', function (socket) {
  socket.on('floodSelected', function (data) {
  var id = "C0L2M1N0S1fld";  //always L2 for now

    if (data == true)
   { //check if cmd (capping) running. if yes, do nothing. if not, start it
    fs.writeFile("cmdFlood2", "1", function(err) {
        if(err) {
            return console.log(err);
        }
    });

   }
  else
   { //check if cmd running. if yes, kill it. if not, do nothing
    fs.writeFile("cmdFlood2", "0", function(err) {
        if(err) {
            return console.log(err);
        }
    });
   }
  });
});

io.on('connection', function (socket) {
  socket.on('lamppost_dimmer', function (data) {
  console.log('lamp light dimmer btn at: ')
  console.log(data);

  var id = "C0L"+data.id+"M0N1S0lam";
  var id_state = data.dimmer_state;
  console.log(data.dimmer_state);
  var insertThis = id+":"+id_state;

  socket.emit('ui_status', data);
  fs.writeFile("ui_status", insertThis, function(err) {
          if(err) {
              return console.log(err);
          }
      });

  });
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