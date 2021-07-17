    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');

    const userRouter = require('./routes/users');

    const PORT = process.env.PORT || 3001;
    const app = express();

    app.use(
        bodyParser.urlencoded({
            extended: false
        })
    )
    app.use(bodyParser.json());

    const database = require("./config/keys").mongoURI;
    mongoose.connect(
        database,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },
    )
    .then(() => console.log("Connected to database successfully"))
    .catch(err => console.log(err));
 
    app.use('/user', userRouter);
    
    app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    });
