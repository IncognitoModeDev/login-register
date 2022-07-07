const express = require('express');
const router = express.Router();

const Auth = require('../models/Auth.js');

//@route   GET api/auth
//@desc    Get all HWID

router.post('/auth', async (req, res) => {
    const { email,password } = req.body;
    
    try {
        //find user by email
        const emailAuth = await Auth.findOne({ email });
        const passwordAuth = await Auth.findOne({ password });
        const emailString = email.toString()
        const passwordString = password.toString()

        if (emailString == emailAuth.email && passwordString == passwordAuth.password) {
            return res.status(200).json("Valid");
        } else {
            return res.status(400).json("Invalid");
        }
    }catch (err) {
        console.log(err);
        res.status(500).send('API Error');
    }
})

module.exports = router