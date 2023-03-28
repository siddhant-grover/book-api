const express = require('express')
const router  = express.Router();
const indexController = require('../controllers/indexController')
module.exports = (app)=>{


    router.post('/login',indexController.handleLogin);
    router.post('/register',indexController.handelNewUser);
    router.post('/logout',indexController.handelLogout);//todo
    router.post('/refresh',indexController.handelRefreshToken);//todo

    return router;
}


