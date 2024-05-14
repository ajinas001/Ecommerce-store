const express =require('express')
const bcrypt = require('bcryptjs');
const Registermodel = require('../../model/Register/Registermodel');

const LoginRouter = express.Router()


LoginRouter.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        console.log(email);
        const data = await Registermodel.findOne({ email: email });
        console.log(data, "data");
        if (data) {
            const match = await bcrypt.compare(password, data.password);
            if (match) {
                console.log("login success");
                return res.status(200).json({
                    success: true,
                    error: false,
                    data: data,
                    message: "Login successful"
                });
            } else {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: "Incorrect Password!"
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Email not found. Please register."
            });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error"
        });
    }
});
// LoginRouter.post('/glogin', async (req, res) => {
//     console.log(req.body,"gdtaa==");
//     const { email, name } = req.body;
//     try {
//         console.log(email);
//        const data = {
//         email:email,
//         name:name,
//         logintype:"google"
//        }
//     const existing = await Registermodel.findOne({email:email})
//     if(existing){
//         const update = await Registermodel.findOneAndUpdate({email:email},{
//             email:email,name:name
//         })
//     }
//     else{
//         const details = await Registermodel(data).save()
//     }
   
       
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({
//             success: false,
//             error: true,
//             message: "Internal server error"
//         });
//     }
// });
LoginRouter.post('/glogin', async (req, res) => {
    console.log(req.body, "gdtaa==");
    const { email, name } = req.body;

    try {
        // Ensure 'email' and 'name' are provided in the request body
        if (!email || !name) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Email and name are required."
            });
        }

        console.log(email);

        // Check if the user already exists
        let existingUser = await Registermodel.findOne({ email });

        if (!existingUser) {
            
            const newUser = new Registermodel({
                email,
                name,
                phone:"null",
                password:"null",
                cart:[],
                wishlist:[],
                logintype: "google",
                role:1,
                status:"null"
            });
            existingUser = await newUser.save();
        }
const details = await Registermodel.findOne({email})
        return res.status(200).json({
            success: true,
            message: "User logged in or registered successfully.",
            data: details ,
         
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error"
        });
    }
});


module.exports = LoginRouter