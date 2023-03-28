const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;
const app = express();
const corsOptions = require('./config/corsOptions.js');
const errorHandler = require('./middlewares/errorHandler')
const os = require('os');
const verifyJWT = require('./middlewares/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({limit: '50mb'}));

//app.use(express.urlencoded({limit: '50mb',extended : true}))


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs','logs.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));


// morgan.token('custom', (req, res) => {
//     // Define your custom log format here
//      //`${req.method} ${req.url} ${res.statusCode} ${res.responseTime}ms`;
//      return `
//     host_machine_name: ${os.hostname() || null},
//     endpoint: ${req.baseUrl},
//     ip: ${req.ip},
//     method: ${JSON.stringify(req.method)},
//     request: ${JSON.stringify(req.body)},
//     headers: ${JSON.stringify(req.headers)},
//     query: ${JSON.stringify(req.query)},
//     timing_start: ${Date.now()}`
//   });
  
//   app.use(morgan(':custom', { stream: accessLogStream }));

app.use('/',require('./routes')(app))
app.use(verifyJWT);
app.use('/facilities',require('./routes/facility')(app))



app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
