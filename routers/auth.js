const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registrationValidation, loginValidation }= require('./UserValidation');
const jwt = require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

router.post('/register', async (req, res) => {
    try {
        const {error} = registrationValidation(req.body);
        if (error) {
            res.json({success: false, message: error.details[0].message});

        }

        const emailexist = await User.findOne({email: req.body.email});

        if (emailexist) {
            res.json({success: false, message: "email already exist "});
        }

        const salt = await bcrypt.genSalt(15);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });

        try {
            const saveUser = await newUser.save();
            res.json({success: true, data: saveUser});

        } catch (e) {
            res.json({success: false, msg: e});
        }


    } catch (e) {
        res.json({success: false, message: e});
    }


    //res.send('registration')
    //const value = await schema.validate(req.body);

//console.log(registrationValidation(req.body));

    // try {
    //
    //    // const validate= await schema.validateAsync(req.body);
    //     const {error} = registrationValidation(req.body);
    // if(error){
    //     res.json({success: false, message: error.details[0].message});
    //
    // }
    //     const newUser = new User({
    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password
    //     });
    //
    //     try {
    //         const saveUser = await newUser.save();
    //         res.json({success: true, data: saveUser});
    //
    //     } catch (e) {
    //         res.json({success: false, msg: e});
    //     }
    // }
    // catch (err) {
    //     res.json({success: false, message: ''});
    //
    //     // res.send(err.details[0].message)
    // }

    //  const validate= Joi.validate(req.body, schema);

    //
    //
    // const newUser = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    //
    // try {
    //     const saveUser = await newUser.save();
    //     res.json({success: true, data: saveUser});
    //
    // } catch (e) {
    //     res.json({success: false, msg: e});
    // }

});

router.post('/login', async (req, res) => {

    const {error} = loginValidation(req.body);
    if (error) {
        res.json({success: false, message: error.details[0].message});

    }
    try {

        const user = await User.findOne({email: req.body.email});

        if (user) {

            const valiedPassword = await bcrypt.compare(req.body.password, user.password);
            if (valiedPassword) {
                const token = jwt.sign(user.toJSON(), process.env.API_SECRET, {
                    expiresIn: 604800 // 1 week
                });
                res.json({success: true, message: 'Login success', token: token});
            }
            else {
                res.json({success: false, message: 'Password Not match'});
            }
        }
        else {
            res.json({success: false, message: 'No email found'});

        }

    } catch (e) {
        res.json({success: false, message: e});
    }
});

module.exports = router;


// mongodb+srv://jibon:<password>@cluster0.blwny.mongodb.net/<dbname>?retryWrites=true&w=majority