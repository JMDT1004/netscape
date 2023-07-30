const express = require('express');

const app = express();
const PORT = process.env.PORT || 3333;

//import routes

const db = require('./db/connections')

//middleware
app.use(express.json());

//routes
app.use()

db.once('open', () => {
    app.listen(PORT, () =>
        console.log('Server started on port $s', PORT));
})