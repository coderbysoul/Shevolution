var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port = 5000;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

//Routing
app.get("/", function(req, response){
    response.sendFile(path.join(__dirname, "index.html"))
})

app.post("/send_email", function(req, response){
    var fullname = req.body.name;
    var gmail = req.body.email;
    var msg = req.body.message;

    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth: {
            user: 'shevolution611@gmail.com',
            pass: 'wixq arir nenu hygw'
        }
    });

    var mailOptions = {
        from: gmail, // sender's email address
        to: 'shevolution611@gmail.com', // receiver address (your email)
        replyTo: gmail,
        subject: 'New Contact Form Submission', // Subject line
        text: 'You have received a new message from ' + fullname + ' (' + gmail + '):\n\n' + msg // plain text body
    };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("Email Send: " + info.response)
        }
        response.redirect("/")
    } )
})

// initialize Web Server
server.listen(port, function(){
    console.log("Starting Server on port: "+port)
})

