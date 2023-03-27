const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = require('./config/corsOptions.js')
const errorHandler = require('./middlewares/errorHandler')
app.use(cors(corsOptions));

app.use(express.json({limit: '50mb'}));

//app.use(express.urlencoded({limit: '50mb',extended : true}))
const PORT = process.env.PORT || 8080;

app.use('/facilities',require('./routes/facility')(app))


app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})