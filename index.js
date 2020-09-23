require('dotenv').config()
const PORT=process.env.PORT;
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const nodemailer=require('nodemailer')
const app=express();

const corsOptions = {
    
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204      
}
app.use(cors(corsOptions));

let transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }  
});

app.post('/sendEmail',bodyParser.json(),(req,res)=>{
    console.log("hello")
    let  Name=req.body.name;
    let  Email=req.body.to;
    let  bill=req.body.bill;
    let  phno=req.body.phno;
    let html=`<div style="width: 100%;height: 60vh;background-color: #fff;border: 2px solid#777;border-radius: 7px;">
    <div style="width: 100%;height: 10vh;;background:linear-gradient(rgb(9, 9, 206),rgba(123, 10, 151, 0.527));position: relative;padding-top: 0.2rem;"><h3 style="text-align:center;font-size: 1.5rem;font-family: sans-serif;text-transform: uppercase;position: relative;top: -2px;">Voiz Fonica</h3></div>
     <div style="margin: 5rem;">
         <p style="font-size: 1.2rem; font-family: sans-serif;font-weight: 400;">
             Hii <b>${Name}</b>,<br>
             This email is reguarding of your bill payment of VoiZFonica.<br>
             <br>
             <b>Your Email:</b>${Email}  <br>
             <br>
             <b>Your PhoneNumber:</b>${phno}  <br>
             <br>
             <b>Your Bill:</b>Rs. ${bill} /-  <br>
         </p>
     </div>
    </div>`  
    let mailOpations={
        from:process.env.EMAIL,
        to:Email,
        subject:`VoizFonica Bill payment`,
        html:html,
        };
    transport.sendMail(mailOpations,(err,data)=>{
        if(!err){
            res.json({
                message:'Email Sent Successfully..',
                status:true
                })
            }
        else{
            res.json({
                message:'Error While Sending Email :(',
                status:false
                })
            }
    })
});
app.listen(PORT);
