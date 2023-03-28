const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.users;

const handleLogin = async (req, res,next) => {
    const { user, pwd } = req.body;
    try{
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ where: { name: user } });
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
       
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.name
                }
            },
            `process.env.ACCESS_TOKEN_SECRET`,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.name },
            `process.env.REFRESH_TOKEN_SECRET`,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
       let result= await User.update({ refresh_token: refreshToken }, { where: { id: foundUser.id } })

        console.log(result);


        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken });

    } else {
        res.sendStatus(401);
        
    }
    }catch(err){
        next(err)
    }
}
const handelNewUser =async(req,res,next)=>{

    const {user,pwd} = req.body;
    //common error_handler //todo
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const duplicate = await User.findOne({ where: { name: user } });
    if (duplicate) return res.sendStatus(409); //Conflict 

    try{
        const salt = await bcrypt.genSalt();
        const hashedPwd = await bcrypt.hash(pwd,salt);
        

        await User.create({
            name:user,
            password:hashedPwd
        })
        res.status(201).json({ 'success': `New user ${user} created!` });

    }
    catch(err){
        next(err)
    }




}
const handelLogout =(req,res)=>{
    res.sendStatus(200);
}
const handelRefreshToken =(req,res)=>{
    res.sendStatus(200);
}



module.exports = {handleLogin,handelNewUser,handelLogout,handelRefreshToken}