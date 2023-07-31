const express = require('express');

const app = express();
const PORT = process.env.PORT || 3333;

// Import routes
const thought_route = require('./routes/thought_route');
const user_route = require('./routes/user_route');

// Import DB connections
const db = require('./db/connection')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Routes
app.use('/api', user_route);
app.use('/api', thought_route);

db.once('open', () => {
    app.listen(PORT, () =>
        console.log('Server started on port', PORT));
});