const express = require('express')
const router  = express.Router();
const facilityController = require('../controllers/facilityController')
module.exports = (app)=>{
    router.route('/')
    .post(facilityController.createFacilities)
    .get(facilityController.getFacilities)

 //   router.post('/ok')
    return router;
}


