const db = require('../models');

const Facility = db.facilities;

const getFacilities = async (req,res)=>{

    let facilities = await Facility.findAll({});

    res.status(200).json({
        facilities
    })

}

const createFacilities = async (req,res,next)=>{

try{

    let info ={
        name:req.body.name,
        phone:req.body.phone,
        city:req.body.city
    }
    let facilities = await Facility.create(info);

    res.status(200).json({
        facilities
    })
}
catch(err){
    next(err)

}

}

module.exports = {getFacilities , createFacilities}