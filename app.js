const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require ("https");

const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//display file on page
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})


//render the subscribers to mailchimp 
app.post("/", function(req,res){
   const firstName= req.body.fName;
    const lastName= req.body.lName;
    const email=req.body.email;

    const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME: lastName
            }
    }
]
}

let jsonData= JSON.stringify(data);

const url="https://us8.api.mailchimp.com/3.0/lists/f6e9ac02ef";

const options={
    method:"POST",
    auth: "tobiloba:4b62564eb191e8a1b8a1c7bc5cbdbf8-us8"
}

const request= https.request(url, options, function(response){

    
if (response.statusCode===200){
    // res.sendFile(__dirname +"/success.html")
res.sendFile(__dirname + "/success.html")

}else{
    res.sendFile(__dirname + "/failure.html")
    
}


    response.on("data", function(data){
         console.log (JSON.parse(data));
    })
   
})
 
    request.write(jsonData);
    request.end();

});


//redirect back to subscribtion page
app.post("/failure", function(req,res){
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Your port 3000 is active!")
})


 // User ID
// 9ec3de876979ae513fdbb78971749e54-us8

 //list ID
// f6e9ac02ef