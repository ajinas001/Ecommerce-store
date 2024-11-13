const express = require ('express') 
const productmodel = require('../../model/Admin/Addproductmodel')
const Registermodel = require('../../model/Register/Registermodel')
const OrderModel = require('../../model/User/Ordermodel')
const Cartmodel = require('../../model/User/Cartmodel')
const Userrouter = express.Router()


Userrouter.get('/viewproduct', async (req,res)=>{
    try {
        const data = await productmodel.find({Discount:{$eq:0}})
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
Userrouter.get('/viewsectionproduct/:category', async (req, res) => {
    const Category = req.params.category;  // Use query for GET request parameters
    if (Category) {
        console.log("Category wise", Category);
        try {
            const data = await productmodel.find({Category:Category});
            console.log(data,"data");
            if (data.length > 0) {
                return res.status(200).json({
                    data: data,
                    message: "category data Success"
                });
            } else {
                return res.status(400).json({
                    data: null,
                    message: "No product found"
                });
            }
        } catch (error) {
            console.error("Error on viewing product by category:", error);
            return res.status(500).json({
                data: null,
                message: "Internal server error"
            });
        }
    } 
    // else {
    //     try {
    //         const data = await productmodel.find({ Discount: { $eq: 0 },});
    //         if (data.length > 0) {
    //             return res.status(200).json({
    //                 data: data,
    //                 message: "all category product Success"
    //             });
    //         } else {
    //             return res.status(400).json({
    //                 data: null,
    //                 message: "No product found"
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Error on viewing product without discount:", error);
    //         return res.status(500).json({
    //             data: null,
    //             message: "Internal server error"
    //         });
    //     }
    // }
});
Userrouter.get('/viewsectionallproduct', async (req, res) => {
        try {
              const data = await productmodel.find();
            if (data.length > 0) {
                return res.status(200).json({
                    data: data,
                    message: "category data Success"
                });
            } else {
                return res.status(400).json({
                    data: null,
                    message: "No product found"
                });
            }
        } catch (error) {
            console.error("Error on viewing product by category:", error);
            return res.status(500).json({
                data: null,
                message: "Internal server error"
            });
    } 
   
});

   
Userrouter.post('/viewuserdetails', async (req,res)=>{
    console.log("api");
    try {
        const data = await Registermodel.find({_id:req.body._id})
        console.log("userdetails:",data);
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

Userrouter.post('/addtowishlist', async (req, res) => {
    const userid = req.body.userid;
    const productid = req.body.productId;
    console.log(req.body);

    try {
        const user = await Registermodel.findOne({_id: userid});
        if (!user) {
            return res.status(400).json({
                data: null,
                message: "No user found"
            });
        } else {
            const exist = await Registermodel.findOne({_id: userid, wishlist: productid});
            if (!exist) {
                const updatedUser = await Registermodel.findOneAndUpdate(
                    { _id: userid },
                    { $push: { wishlist: productid } },
                    { new: true } // To return the updated document
                );

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
            } else {
                return res.status(200).json({
                    data: user,
                    message: "Product already in wishlist"
                });
            }
        }
    } catch (error) {
        console.log("Catch error on add to wishlist:", error);
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
                message: "Success",
                totalwishlist:userdetails.wishlist.length
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
    console.log(Category);
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

Userrouter.get('/search', async (req, res) => {
    const query = req.query.q; // Get search query from URL params
    console.log(query);
    try {
        const products = await productmodel.find({
            $or: [
                { Name: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
                { Category: { $regex: query, $options: 'i' } } // Case-insensitive search by category
                // Add more fields for search if needed
            ]
        });
        return res.status(200).json({
            data: products,
            message: "Search success"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

Userrouter.post('/saveorder', async (req, res) => {
    try {
        const { userId, info, products, totalPrice } = req.body;

        const newOrder = {
            userId: userId,
            Name: info.Name,
            Email: info.Email,
            Phone: info.Phone,
            SecondaryPhone: info.SecondaryPhone,
            products: products.map(product => ({
                productId: product.productId,
                size: product.size,
                price: product.price,
                quantity: product.quantity,
            })),
            UserAddress: {
                Address: info.Address,
                City: info.City,
                State: info.State,
                PinCode: info.PinCode,
            },
            PaymentMethod: 'COD', // Replace with actual method if available
            TotalPrice: totalPrice,
            IsPaid: false,
            IsDelivered: false,
        };

        const details = await OrderModel(newOrder).save();

        if (details) {
            const user = await Registermodel.findById(userId);
            const newAddress = {
                Address: info.Address,
                City: info.City,
                State: info.State,
                PinCode: info.PinCode,
            };

            // Check if the new address already exists in the user's address list
            const addressExists = user.UserAddress.some(addr =>
                addr.Address === newAddress.Address &&
                addr.City === newAddress.City &&
                addr.State === newAddress.State &&
                addr.PinCode === newAddress.PinCode
            );

            if (!addressExists) {
                user.UserAddress.push(newAddress);
            }

            user.Phone = info.Phone;
            user.SecondaryPhone = info.SecondaryPhone;

            await user.save();

            await Cartmodel.findOneAndDelete({ userId: userId });
            res.status(201).json({ message: 'Order saved successfully', order: newOrder });
        } else {
            console.error('Error saving order');
            res.status(500).json({ message: 'Failed to save order' });
        }
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Failed to save order', error });
    }
});
Userrouter.post('/saveaddress', async (req, res) => {
    try {
        const { userId, info, addressId } = req.body;
        console.log(req.body);

        const newAddress = {
            Name: info.Name,
            Phone: info.Phone,
            Email: info.Email,
            SecondaryPhone: info.SecondaryPhone,
            Address: info.Address,
            City: info.City,
            State: info.State,
            PinCode: info.PinCode,
        };

        console.log(newAddress, "abc");

        const user = await Registermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (addressId) {
            // Find the address in the array and update it
            const addressIndex = user.UserAddress.findIndex(address => address._id.toString() === addressId);
            if (addressIndex !== -1) {
                user.UserAddress[addressIndex] = newAddress;
            } else {
                return res.status(404).json({ message: 'Address not found' });
            }
        } else {
            // If no addressId, push the new address
            user.UserAddress.push(newAddress);
        }

        await user.save();

        res.status(201).json({ message: 'Address saved successfully' });
    } catch (error) {
        console.error('Error saving address:', error);
        res.status(500).json({ message: 'Failed to save address', error });
    }
});


Userrouter.post('/editaddress', async (req, res) => {
    try {
        const { userid, id } = req.body;
        console.log(req.body);

        const user = await Registermodel.findOne(
            { _id: userid, UserAddress: { $elemMatch: { _id: id } } },
        );
        console.log(user,"user==");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'success',data:user });
    } catch (error) {
        console.error('Error finding address:', error);
        res.status(500).json({ message: 'Failed to find address', error });
    }
});

Userrouter.post('/deleteaddress', async (req, res) => {
    try {
        const { userid, _id } = req.body;
        console.log(req.body);

        const user = await Registermodel.findOneAndUpdate(
            { _id: userid },
            { $pull: { UserAddress: { _id: _id } } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({ message: 'Failed to delete address', error });
    }
});





Userrouter.post('/vieworder', async (req, res) => {
    try {
        const orderid= req.body.orderid
        const userId = req.body.userid 
        if (!orderid) {
            console.log(userId);
            console.log(orderid);
            console.log("order fetching using userId");
        
            // Find the latest order for the given userId
            const details = await OrderModel.findOne({ userId: userId }).sort({ createdAt: -1 });
           
        
            if (details) {
                // Extract productIds from the order details
                const productIds = details.products.map(product => product.productId);
        
                // Find the products by their ids
                const products = await productmodel.find({ _id: { $in: productIds } });
        
                res.status(200).json({ message: 'Order viewed successfully', data: details, products: products  });
            } else {
                res.status(404).json({ message: 'No order found for the provided userId' });
            }
        }
        
        else if(orderid){
            console.log("orderfetchingusingorderid");
            const details = await OrderModel.findOne({ _id:orderid });
            const productIds = details.products.map(product => product.productId);
            const products = await productmodel.find({ _id: { $in: productIds } });
    
            if (details) {
                res.status(200).json({ message: 'Order viewed successfully', data: details,products:products });
            } else {
                res.status(404).json({ message: 'No order found for the provided userId' });
            }
        }
         

    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: 'Failed to view order', error: error.message });
    }
});

Userrouter.post('/viewallorders', async (req, res) => {
    const userId = req.body.userid;

    try {
        let details;
        if (userId) {
            details = await OrderModel.find({ userId: userId });
        } else {
            details = await OrderModel.find();
        }

        if (details) {
            const productIds = details.flatMap(order => order.products.map(product => product.productId));
            const products = await productmodel.find({ _id: { $in: productIds } });
            
            res.status(200).json({ 
                message: 'Order viewed successfully', 
                data: details, 
                products: products 
            });
        } else {
            res.status(404).json({ message: 'No orders found' });
        }
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ message: 'Failed to view order', error: error.message });
    }
});


module.exports = Userrouter