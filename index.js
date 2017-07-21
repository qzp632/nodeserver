var express = require('express')
var app = express()

var server = require('http').createServer(app)

var io = require('socket.io')(server)

var count = 0;

io.on('connection',function(socket){

	socket.on('login',function(data){
		count++
		socket.username = data.username
		io.emit('counts',count)
		console.log(data.username+'登陆了')
	})

	socket.on('send',function(data){
		io.emit('msg',{user:socket.username,msg:data})
	})

	socket.on('disconnect',function(){
		count--
		// socket.username = data.username
		io.emit('counts',count)
	})
	// console.log()
})

app.get('/index',function(req,res){
	res.send('hello world')
})


server.listen(3000)