const express = require ('express') 
const productmodel = require('../../model/Admin/Addproductmodel')
const Registermodel = require('../../model/Register/Registermodel')
const Userrouter = express.Router()


Userrouter.get('/viewproduct', async (req,res)=>{
    try {
        const data = await productmodel.find()
        if(data){
            return res.status(200).json({
                data:data,
                message:"Success"
            })
        }
        else{
            return res.status(400).json({
                data:null,
                message:"no product found"
            })
        }
    } catch (error) {
        console.log("catch error on view  product");
    }
   
})
Userrouter.post('/viewuserdetails', async (req,res)=>{
    try {
        const data = await Registermodel.find({_id:req.body._id})
        if(data){
            return res.status(200).json({
                data:data,
                message:"Success"
            })
        }
        else{
            return res.status(400).json({
                data:null,
                message:"no user found"
            })
        }
    } catch (error) {
        console.log("catch error on view  user");
    }
   
   
})
Userrouter.get('/viewofferproduct', async (req,res)=>{
    try {
        const data = await productmodel.find({Discount:{$gt:0}})
        if(data){
            return res.status(200).json({
                data:data,
                message:"Success"
            })
        }
        else{
            return res.status(400).json({
                data:null,
                message:"no product found"
            })
        }
    } catch (error) {
        console.log("catch error on view  product");
    }
   
   
})
Userrouter.post('/addtocart', async (req, res) => {
    const userid = req.body.userid;
    const productid = req.body.id;
    console.log(req.body);
    try {
        const updatedUser = await Registermodel.findOneAndUpdate(
            { _id: userid },
            { $push: { cart: productid } },
            { new: true } // To return the updated document
        );
        console.log(updatedUser);
        if (updatedUser) {
            return res.status(200).json({
                data: updatedUser,
                message: "Success"
            });
        } else {
            return res.status(400).json({
                data: null,
                message: "No user found"
            });
        }
    } catch (error) {
        console.log("Catch error on add to cart:", error);
        return res.status(500).json({
            data: null,
            message: "Internal server error"
        });
    }
});
Userrouter.post('/addtowishlist', async (req, res) => {
    const userid = req.body.userid;
    const productid = req.body.id;
    console.log(req.body);
    try {
        const updatedUser = await Registermodel.findOneAndUpdate(
            { _id: userid },
            { $push: { wishlist: productid } },
            { new: true } // To return the updated document
        );
        console.log(updatedUser);
        if (updatedUser) {
            return res.status(200).json({
                data: updatedUser,
                message: "Success"
            });
        } else {
            return res.status(400).json({
                data: null,
                message: "No user found"
            });
        }
    } catch (error) {
        console.log("Catch error on add to cart:", error);
        return res.status(500).json({
            data: null,
            message: "Internal server error"
        });
    }
});

Userrouter.post('/viewcart', async (req, res) => {
    const userid = req.body.userid;
    console.log(userid);
    try {
        const userdetails = await Registermodel.findOne({_id:userid});
        console.log(userdetails);
        const products = await productmodel.find({ _id:userdetails.cart })
        console.log(products);
        if (userdetails) {
            return res.status(200).json({
                data: products,
                message: "Success"
            });
        } else {
            return res.status(400).json({
                data: null,
                message: "No user found"
            });
        }
    } catch (error) {
        console.log("Catch error on add to cart:", error);
        return res.status(500).json({
            data: null,
            message: "Internal server error"
        });
    }
});
Userrouter.post('/viewwishlist', async (req, res) => {
    const userid = req.body.userid;
    console.log(userid);
    try {
        const userdetails = await Registermodel.findOne({_id:userid});
        console.log(userdetails);
        const products = await productmodel.find({ _id:userdetails.wishlist })
        console.log(products);
        if (userdetails) {
            return res.status(200).json({
                data: products,
                message: "Success"
            });
        } else {
            return res.status(400).json({
                data: null,
                message: "No user found"
            });
        }
    } catch (error) {
        console.log("Catch error on add to cart:", error);
        return res.status(500).json({
            data: null,
            message: "Internal server error"
        });
    }
});
Userrouter.post('/deletefromcart', async (req, res) => {
    const userid = req.body.userid;
    const productid  = req.body.productid
    console.log(userid);
    try {
        const userdetails = await Registermodel.findOneAndUpdate({_id:userid},{$pull:{cart:productid}},{new:true});
        console.log(userdetails);
        if (userdetails) {
            return res.status(200).json({
                data: userdetails,
                message: "Success"
            });
        } else {
            return res.status(400).json({
                data: null,
                message: "No product found"
            });
        }
    } catch (error) {
        console.log("Catch error on delete from cart:", error);
        return res.status(500).json({
            data: null,
            message: "Internal server error"
        });
    }
});

Userrouter.post('/deletefromwishlist', async (req, res) => {
    const userid = req.body.userid;
    const productid  = req.body.productid
    console.log(userid);
    try {
        const userdetails = await Registermodel.findOneAndUpdate({_id:userid},{$pull:{wishlist:productid}},{new:true});
        console.log(userdetails);
        if (userdetails) {
            return res.status(200).json({
                data: userdetails,
                message: "Success"
            });
        } else {
            return res.status(400).json({
                data: null,
                message: "No product found"
            });
        }
    } catch (error) {
        console.log("Catch error on delete from cart:", error);
        return res.status(500).json({
            data: null,
            message: "Internal server error"
        });
    }
});
Userrouter.post('/viewproductdetails/:_id', async (req,res)=>{
    const id = req.params._id
    console.log(id);
    try {
        
        console.log(id);
        const data = await productmodel.findOne({_id:id})
        if(data){
            return res.status(200).json({
                data:data,
                message:"Success"
            })
        }
        else{
            return res.status(400).json({
                data:null,
                message:"no product found"
            })
        }
    } catch (error) {
        console.log("catch error on view  product details");
    }
   
   
})

Userrouter.post('/similarproducts', async (req, res) => {
    const Category = req.body.Category;
    try {
    
        const products = await productmodel.find({ Category:Category })
        console.log(products,"pr");
        if (products) {
            return res.status(200).json({
                data: products,
                message: "Success on similar products"
            });
        } else {
            return res.status(400).json({
                data: null,
                message: "No product found"
            });
        }
    } catch (error) {
        console.log("Catch error on similar products :", error);
        return res.status(500).json({
            data: null,
            message: "Internal server error"
        });
    }
});


module.exports = Userrouter