const express = require('express');
const OrderModel = require('../../model/User/Ordermodel');
const Orderrouter = express.Router()


Orderrouter.post('/orderstatus', async (req, res) => {
    const { orderid, Status } = req.body;


    if (!orderid || !Status) {
      return res.status(400).json({
        data: null,
        message: 'order ID and status  are required'
      });
    }
  
    try {
      const userdetails = await OrderModel.findOneAndUpdate(
        { _id: orderid },
        { Status:Status } ,
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
          message: 'No order found for the given order ID'
        });
      }
    } catch (error) {
      console.error('Error during status change operation:', error);
      return res.status(500).json({
        data: null,
        message: 'Internal server error'
      });
    }
  });




module.exports = Orderrouter