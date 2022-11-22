const express = require('express');
const connectDB = require('./config/db');
const app = express();

//rate limit
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10 
})

//nessary stuff
connectDB();
app.use(express.json());
app.use(limiter);

//enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/', (req, res) => {
    res.status(200).send('You can add your own homepage here!'); //This is where you add your own homepage
});

app.use("/api/auth/",require('./routes/register'));
app.use("/api", require('./routes/auth'))

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));