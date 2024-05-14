const { config, configDotenv } = require('dotenv');
const express = require('express')
const bcrypt = require('bcryptjs')
const RegisterRouter = express.Router()
require('dotenv').config()



const nodemailer = require('nodemailer');
const otpmodel = require('../../model/Register/Otpmodel');
const session = require('express-session');
const registermodel = require('../../model/Register/Registermodel');

// Set up nodemailer transporter with Gmail SMTP
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.Adminmail, // Replace with your Gmail address
        pass: process.env.mailpassword // Replace with your Gmail password
    }
});

// Generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

RegisterRouter.post('/send', async (req, res) => {
    console.log("API success");
    console.log(req.body);
    console.log('Sending OTP');
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
  
    const email = req.body.email; 
    const otp = generateOTP();
    const userData = {
        otp: otp,
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        password: hashedPassword,
    };
    console.log(userData, "userData");

    try {
        const existingUser = await registermodel.findOne({ email: email });
        console.log("Existing user:", existingUser);
        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        } else {
            const existing = await otpmodel.findOne({ email: email });
            if (existing) {
                // Update existing document
                await otpmodel.findOneAndUpdate({ email: email }, userData);
            } else {
                // Save new document
                await otpmodel.create(userData);
            }
            console.log('OTP saved successfully');

            // Send OTP to the user
            // Implement your logic to send OTP here
            let mailOptions = {
                from: process.env.Adminmail,
                to: email,
                subject: "OTP for registration",
                html: `<h3>OTP for account verification is:</h3><h1 style='font-weight:bold;'>${otp}</h1>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.status(500).json({
                        message:"Error sending Otp"
                        })
                } else {
                    console.log('OTP sent:', otp);
                    res.status(200).json({
                        message:"Otp sent successfully"
                    });
                }
            });
        }
    } catch (error) {
        console.error('Error saving OTP:', error);
        res.status(500).send('Error sending OTP');
    }
});


RegisterRouter.post('/verify', async (req, res) => {
    console.log(req.body, "api");
    const otp = req.body.code;
    const email = req.body.email;
    console.log(otp, "otp===");

    try {
        const data = await otpmodel.findOne({ email: email });
        if (data) {
            console.log(data, "data====");
            const expectedOTP = data.otp; // Assuming you're using sessions to store OTP
            if(expectedOTP==otp){
                console.log("verified");
                return res.status(200).json({data:data, message: "verified" })
                
            }
            else{
                console.log("Invalid otp");
                return res.status(400).json({ message: "Invalid otp" })
            }
           
        }
        else {
            return res.status(400).json({ message: "Something went wrong" })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: true,
            error: false,
            message: "can't find data"
        })
    }
});



//Registration

RegisterRouter.post('/save', async (req, res) => {
    console.log(req.body,"dat");
    try {
        const data = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            role:1,
            staus:"null",
            cart:[],
                wishlist:[],
                logintype: "normal registration",
        }
        console.log(data,"datas");

        const del = await otpmodel.findOneAndDelete({email:data.email})
        const details = await registermodel(data).save()
        if(details){
            res.status(200).json({
                message:"saved successfully"
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message:"catch error can't save data"
        })
    }
   
})


RegisterRouter.post('/refetching', async (req, res) => {
    console.log(req.body,"redat");
    const email = req.body.email
    console.log(email,"datas");
    try {
       
        const details = await otpmodel.findOne({email:email})
        if(details){
            res.status(200).json({
                data:details,
                message:"data"
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message:"catch error can't get data"
        })
    }
   
})


RegisterRouter.post('/forgototp', async (req, res) => {
    console.log("API success");
    console.log(req.body);
    console.log('Sending OTP');
    const email = req.body.email; 
    const otp = generateOTP();
    const userData = {
        otp: otp,
        email: req.body.email
    };
    console.log(userData, "userData");

    try {
            const existing = await otpmodel.findOne({ email: email });
            if (existing) {
                // Update existing document
                await otpmodel.findOneAndUpdate({ email: email }, userData);
            } else {
                // Save new document
                await otpmodel.create(userData);
            }
            console.log('OTP saved successfully');

            // Send OTP to the user
            // Implement your logic to send OTP here
            let mailOptions = {
                from: process.env.Adminmail,
                to: email,
                subject: "OTP for registration",
                html: `<h3>OTP for changing password is :</h3><h1 style='font-weight:bold;'>${otp}</h1>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.status(500).json({
                        message:"Error sending Otp"
                        })
                } else {
                    console.log('OTP sent:', otp);
                    res.status(200).json({
                        message:"Otp sent successfully"
                    });
                }
            });
        
    } catch (error) {
        console.error('Error saving OTP:', error);
        res.status(500).send('Error sending OTP');
    }
});

RegisterRouter.put('/updatepass', async (req,res)=>{
    console.log(req.body,"api start");
    // const email = req.body.email
    const del = await otpmodel.findOne({email:req.body.email})
    if(del){
        await otpmodel.findOneAndDelete({email:req.body.email})
    }
    try {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const data = await registermodel.findOneAndUpdate({email:req.body.email},{
            password:hashedPassword
        })
        console.log(data,"upd");
        if(data){
            return res.status(200).json({
                message:"Password changed successfully"
            })
        }
        else{
            return res.status(400).json({
                message:"Can't find registered data"
            })
        }
       
    } catch (error) {
        return res.status(400).json({
            message:"Can't change catch error"
        })
    }
})



module.exports = RegisterRouter
