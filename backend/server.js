//invoking congfig method to attach env vars to process.env
require('dotenv').config();
// const { createProxyMiddleware } = require('http-proxy-middleware');


const express = require('express');
const cors = require('cors');

const workoutsRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

const mongoose = require('mongoose');

// create express app
const app = express();

corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", ], 
}

app.use(cors(corsOptions));

//middleware
app.use(express.json()); // for json body parsing

app.use((req, res, next)=>{
    console.log(req.method, req.path, req.url)
    console.log('Time:', Date.now());
    next();
})


//routes
app.use('/api/workouts', workoutsRoutes);
app.use('/api/user', userRoutes);

//connect to mongodb
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB!");
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Server is listening on port 4000!");
});
    })
    .catch((err) => {
        console.log("Connection failed!", err);
    });




