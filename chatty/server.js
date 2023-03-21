const express = require("express");
const app = express();
const port = 80;
const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/chattydb';

mongoose.connect(connectionString, { useNewUrlParser: true });

mongoose.connection.on('error', () => {
    console.log('CONNECTION ERROR');
});

const Schema = mongoose.Schema;
const ChatMessageSchema = new Schema({
  timed: Number,
  alias: String,
  message: String
});

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema );

ChatMessage.db.collection('chatmessages').deleteMany({});

app.use(express.static('public_html'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}/`);
});

app.get('/chats', (req, res) => {
    ChatMessage.find({}, '-_id time alias message').sort({ time: 1 }).then((result) => {
        console.log("\nCHAT\n"+ result);
        res.send(result);
    });
});

app.get('/chats/post/:alias/:message', (req, res) => {
    let a = req.params.alias;
    let m = req.params.message;
    let t = new Date().getTime();

    var chat = new ChatMessage({
        timed: t,
        alias: a,
        message: m
    });
    
    let p = chat.save();
    p.catch((err) => {
        console.log(err);
    });

    p.then(() => {
        console.log('Chat saved!');
    });

    res.end("Message Posted");
});