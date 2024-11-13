const express = require('express');
const Registermodel = require('../../model/Register/Registermodel');
const productmodel = require('../../model/Admin/Addproductmodel');
const Cartmodel = require('../../model/User/Cartmodel')
const Cartrouter = express.Router()



Cartrouter.post('/add-to-cart', async (req, res) => {
  try {
    console.log(req.body, "add to cart");
    const { productId, quantity, size } = req.body;
    const userId = req.body.userid; // Ensure this is how you're passing the user ID
    let cart = await Cartmodel.findOne({ userId });

    if (!cart) {
      // If the user doesn't have a cart yet, create one
      cart = new Cartmodel({
        userId,
        products: [],
      });
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      // If the product exists, update the quantity
      cart.products[existingProductIndex].quantity += quantity;
      // cart.products[existingProductIndex].size += size;
    } else {
      // If the product doesn't exist, add it to the cart
      cart.products.push({ productId, quantity, size });
    }

    // Save the cart to the database
    const savedCart = await cart.save();

    res.json(savedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Cartrouter.post('/addtocart', async (req, res) => {
//     const userid = req.body.userid;
//     const productid = req.body.id;
//     console.log(req.body,"cart");
//     try {
//         const updatedUser = await Registermodel.findOneAndUpdate(
//             { _id: userid },
//             { $push: { cart: productid } },
//             { new: true } // To return the updated document
//         );
//         console.log(updatedUser);
//         if (updatedUser) {
//             return res.status(200).json({
//                 data: updatedUser,
//                 message: "Success"
//             });
//         } else {
//             return res.status(400).json({
//                 data: null,
//                 message: "No user found"
//             });
//         }
//     } catch (error) {
//         console.log("Catch error on add to cart:", error);
//         return res.status(500).json({
//             data: null,
//             message: "Internal server error"
//         });
//     }
// });
Cartrouter.post('/decrementquantity', async (req, res) => {
  const { userid, productid } = req.body;
  console.log('Received productId:', productid, 'userId:', userid);

  // Validate input
  if (!userid || !productid) {
    return res.status(400).json({
      data: null,
      message: 'User ID and Product ID are required'
    });
  }

  try {
    const userdetails = await Cartmodel.findOneAndUpdate(
      { userId: userid, 'products.productId': productid, 'products.quantity': { $gt: 1 } },
      { $inc: { 'products.$.quantity': -1 } },
      { new: true }
    );

    console.log('Updated details:', userdetails);

    if (userdetails) {
      return res.status(200).json({
        data: userdetails,
        message: 'Success'
      });
    } else {
      return res.status(404).json({
        data: null,
        message: 'No cart found for the given user ID or quantity is already at 1'
      });
    }
  } catch (error) {
    console.error('Error during update operation:', error);
    return res.status(500).json({
      data: null,
      message: 'Internal server error'
    });
  }
});

Cartrouter.post('/deletefromcart', async (req, res) => {
  const { userid, productid } = req.body;
  console.log('Received productId:', productid, 'userId:', userid);

  // Validate input
  if (!userid || !productid) {
    return res.status(400).json({
      data: null,
      message: 'User ID and Product ID are required'
    });
  }

  try {
    const userdetails = await Cartmodel.findOneAndUpdate(
      { userId: userid },
      { $pull: { products: { productId: productid } } },
      { new: true }
    );

    console.log('Updated details:', userdetails);

    if (userdetails) {
      return res.status(200).json({
        data: userdetails,
        message: 'Success'
      });
    } else {
      return res.status(404).json({
        data: null,
        message: 'No cart found for the given user ID'
      });
    }
  } catch (error) {
    console.error('Error during delete operation:', error);
    return res.status(500).json({
      data: null,
      message: 'Internal server error'
    });
  }
});

Cartrouter.post('/viewcart', async (req, res) => {
  const { userid } = req.body;
  try {
      const userCart = await Cartmodel.findOne({ userId: userid });
      if (!userCart) {
          return res.status(200).json({
              data: [],
              cart: null,
              totalQuantity: 0, // Ensure to return totalQuantity as 0 if no cart found
              message: "No user cart found",
          });
      }

      const productIds = userCart.products.map(product => product.productId);
      const products = await productmodel.find({ _id: { $in: productIds } });

      const totalQuantity = userCart.products.reduce((total, product) => total + product.quantity, 0);

      return res.status(200).json({
          data: products,
          cart: userCart,
          totalQuantity: totalQuantity,
          message: "Success",
      });
  } catch (error) {
      console.error("Error fetching cart:", error);
      return res.status(500).json({
          data: null,
          message: "Internal server error",
          totalQuantity: 0,
      });
  }
});


Cartrouter.post('/updatequantity', async (req, res) => {
  const { userid, productid, quantity } = req.body;

  try {
    const userCart = await Cartmodel.findOneAndUpdate(
      { userId: userid, "products.productId": productid }, // Match the user and product
      { $set: { "products.$.quantity": quantity } }, // Update the quantity of the matched product
      { new: true }
    );

    if (userCart) {
      return res.status(200).json({
        data: userCart,
        message: "Quantity updated successfully"
      });
    } else {
      return res.status(404).json({
        data: null,
        message: "Product not found in the cart"
      });
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({
      data: null,
      message: "Internal server error"
    });
  }
});



module.exports = Cartrouter