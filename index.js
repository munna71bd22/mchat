const express = require('express');
const view = require('ejs');
const {json} = require("express");
const app = express();
const a = {}
a.config = {port: 3000}

const socketServer = require('http').Server(app);
const io = require('socket.io')(socketServer);
app.set('view engine','ejs')


const port = 3001;
const host = '192.168.0.101'
socketServer.listen(port,host,() => {
	console.log(`Socket.IO server running at http://${host}:${port}/`);
})


io.on('connection', (socket) => {
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('chat message', msg => {
		io.emit('chat message', msg);
	});
});


app.use(express.static('public'))


app.get('/',(req,res)=> {
	res.render('index',{
		title: "Mchat Application",
		authUser:{
			id:req.query.id,
			name:  req.query.name
		},
		
	})
})

app.get('/send',(req,res)=> {
	let msg = req.query.msg;
	console.log(msg)
	res.send(req.query.msg+' sent')
})





