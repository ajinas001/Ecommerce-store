const express = require('express')
const Adminrouter = express.Router()
const multer = require('multer');
const productmodel = require('../../model/Admin/Addproductmodel');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploadedimages');
    },
    filename: function (req, file, cb) {
        cb(null, (file.originalname));
    },
});

const upload = multer({ storage: storage });



Adminrouter.post('/upload-images', upload.array('files', 3), (req, res) => {
    res.status(200).json({
        message: "images added"
    })
})

Adminrouter.post('/add-product', async (req, res) => {
console.log(req.body,"d");
    try {
        const data = {
            Name: req.body.Name,
            Price: req.body.Price,
            Size: req.body.Size,
            Stock: req.body.Stock,
            Discount: req.body.Discount,
            Category: req.body.Category,
            images: req.body.images,
        }

        console.log(data, "hoteldetails");

        const user = await productmodel(data).save()
       


        console.log(data);
        if (user) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "added"
            })
        }
        if (district) {
            return res.status(200).json({
                success: true,
                error: false,
                message: "added"
            })
        }

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: "something went wrong!!!!!"
        })
    }
})



module.exports = Adminrouter