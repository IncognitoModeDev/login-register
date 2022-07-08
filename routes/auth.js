const express = require('express');
const router = express.Router();

const crypto = require('../utils/crypto.js');
const Auth = require('../models/Auth.js');

//@route   GET api/auth
//@desc    Get all HWID

router.post('/auth', async (req, res) => {
    const { email,password } = req.body;
    
    try {
        const emailString = email.toString()
        const passwordString = password.toString()
        const cryptoKey = crypto.createCipher('aes-128-cbc', 'incognitomode');
        const encryptedPassword = cryptoKey.update(passwordString, 'utf8', 'hex');
        encryptedPassword += cryptoKey.final('hex');
        const encryptedEmail = cryptoKey.update(emailString, 'utf8', 'hex');
        encryptedEmail += cryptoKey.final('hex');
        const emailAuth = await Auth.findOne({ encryptedEmail });
        const passwordAuth = await Auth.findOne({ encryptedPassword });

        //API Key Part
        const urlSearchParams = new URLSearchParams(window.location.search);
        const apiKey = urlSearchParams.get('apiKey');
        const apiKeyString = apiKey.toString();

        if (apiKeyString != 'Your Own different API Key from the register') {

        if (encryptedEmail == emailAuth.email && encryptedPassword == passwordAuth.password) {
            return res.status(200).json("Valid");
        } else {
            return res.status(400).json("Invalid");
        }
        } else {
            return res.status(400).json("Invalid API Key");
        }
    }catch (err) {
        console.log(err);
        res.status(500).send('API Error');
    }
})

module.exports = router