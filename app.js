// Imports:
const express = require('express');
const { connect } = require('mongoose');

// Vars:
const app = express();
const { PORT = 3001 } = process.env;

// Connect to database:
connect('mongodb://127.0.0.1:27017/wtwr_db');

// Begin listening for requests:
app.listen(PORT, () => {
  console.log(`\nServer running on port ${PORT}`);
});
