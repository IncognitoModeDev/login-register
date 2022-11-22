const express = require('express');
const router = express.Router();

const crypto = require('../utils/crypto.js');
const auth = require('../models/Auth.js');

//@route   GET api/auth/register
//@desc    Get all HWID

router.post('/register', async (req, res) => {
    const { email,password } = req.body;
    const urlSearchParams = new URLSearchParams(window.location.search);
    const apiKey = urlSearchParams.get('apiKey');
    const apiKeyString = apiKey.toString();
    const passwordString = password.toString();
    const emailString = email.toString();

    //encrypt part
    const cryptoKey = crypto.createCipheriv('aes-128-cbc', 'incognitomode');
    const encryptedPassword = cryptoKey.update(passwordString, 'utf8', 'hex');
    encryptedPassword += cryptoKey.final('hex');
    const encryptedEmail = cryptoKey.update(emailString, 'utf8', 'hex');
    encryptedEmail += cryptoKey.final('hex');

    if (apiKeyString != 'Your Own API Key') {
    try {
        const newUser = new auth({
            encryptedEmail,
            encryptedPassword
        });

        await newUser.save();

        res.status(200).json("User Registered");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error/User Already Added');
    }
    } else {
        res.status(400).send('Invalid API Key');
    }
})

module.exports = router;