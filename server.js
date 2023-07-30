const express = require('express');

const app = express();
const PORT = process.env.PORT || 3333;

//import routes
const user_route = require('./routes/user_route');
const thought_route = require('./routes/thought_route');

const db = require('./db/connections')

//middleware
app.use(express.json());

//routes
app.use('/api', [user_route, thought_route])

db.once('open', () => {
    app.listen(PORT, () =>
        console.log('Server started on port $s', PORT));
})