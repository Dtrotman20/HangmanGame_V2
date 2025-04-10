const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://mongo:27017/hangman', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectDB = require('./db');
connectDB();

const PlayerSchema = new mongoose.Schema({
  name: String,
  wins: Number,
  gamesPlayed: Number,
});

const Player = mongoose.model('Player', PlayerSchema);

app.get('/players', async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

app.post('/players', async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.json(player);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
