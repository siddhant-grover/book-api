const express = require('express')
const router  = express.Router();
const indexController = require('../controllers/indexController')
module.exports = (app)=>{


    router.post('/login',indexController.handelLogin);
    router.post('/register',indexController.handelLogin);
    router.post('/logout',indexController.handelLogin);
    router.post('/refresh',indexController.handelLogin);

    return router;
}


