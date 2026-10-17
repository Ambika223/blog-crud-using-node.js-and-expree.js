const express = require('express');
const blogRoutes = require('./blogroutes');

const app = express();

app.use(express.json());
app.use('/api/blogs', blogRoutes);

module.exports = app;
