const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");



const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // console.log(firstName + " | " + lastName + " | " + email);

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            marge_feilds: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/b5e072a05d";

    const options = {
        method: "POST",
        auth: "Buddhika1996:e0045fd48c26921cf350849c549f730a-us21"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });



    request.write(jsonData);
    request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});



app.listen(port, function () {
    console.log("Server got started, port 3000");
});

// e0045fd48c26921cf350849c549f730a-us21

// b5e072a05d

