//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://gmail.us11.list-manage.com/subscribe/post?u=3c773d28f07135905ba0d8e88";

    const options = {
        method: "POST",
        auth: "Anthony:102089a31f4ffbe0285eceed3937112f-us11"
    };

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");

        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

// {"name":"Freddie'\''s Favourite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re recieving this email because you signed upfor updates about Freddie'\''s newest hats.",""}{}

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});


// Api Key
// 102089a31f4ffbe0285eceed3937112f-us11

// list_id
// 1e4ea9c88c