//example for API request

const axios = require('axios').default;

axios.post("http://localhost:5000/api/auth",{
    email: "incognito@incognitomode.dev",
    password: "incognito" //this is just a proof of concept is not my real password
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (err) {
    console.log(err);
})