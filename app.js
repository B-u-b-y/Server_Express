var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // Add this line for CORS support

// Import routes
const appearances_Router = require('./routes/appearances_routes');
const club_games_Router = require('./routes/club_games_routes');
const game_events_Router = require('./routes/game_events_routes');
const game_lineups_Router = require('./routes/game_lineups_routes');
const games_Router = require('./routes/games_routes');
const player_Router = require('./routes/player_valuations_routes');

const db = require('./db/db')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // Enable CORS

// Use routes
app.use('/api/appearances', appearances_Router);
app.use('/api/club_games', club_games_Router);
app.use('/api/game_events', game_events_Router);
app.use('/api/game_lineups', game_lineups_Router);
app.use('/api/games', games_Router);
app.use('/api/players', player_Router); // All player-related requests

db(); // Ensure DB is connected

// Error handling
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
