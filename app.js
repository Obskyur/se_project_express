// Imports:
const express = require('express');
const { connect } = require('mongoose');

// Vars:
const app = express();
const { PORT = 3001 } = process.env;

connect('mongodb://127.0.0.1:27017/wtwr_db');
app.listen(PORT, () => {
  console.log(`\nServer running on port ${PORT}`);
});
