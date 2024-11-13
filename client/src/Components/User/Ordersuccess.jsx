import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';

const OrderSuccess = () => {
    const userid = localStorage.getItem("id");
    const [data, setData] = useState({});
    const [details, setDetails] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [product,setproduct] = useState({})
    const [size, setSize] = useState({});

    useEffect(() => {
        Aos.init({ duration: 1500 });
        fetchOrderData();
        // fetchCartData();
    }, [userid]);

    const fetchOrderData = async () => {
        try {
            const res = await axios.post('http://localhost:4005/user/vieworder', { userid });
            console.log('Order Data:', res.data.data); // Debugging log
            console.log('product Data:', res.data.products); // Debugging log
            setData(res.data.data || {});
            const itemCounts = {};
            const itemSizes = {};
            if (res.data.data && res.data.data.products) {
                res.data.data.products.forEach(product => {
                    itemCounts[product.productId] = product.quantity;
                    itemSizes[product.productId] = product.size;
                });
            }
            console.log("Quantities:", itemCounts); // Debugging log
            setQuantities(itemCounts);
            setSize(itemSizes);
            setproduct(res.data.products)
        } catch (error) {
            console.error("Error fetching order data: ", error);
        }
    };

    // const fetchCartData = async () => {
    //     try {
    //         const res = await axios.post("http://localhost:4005/cart/viewcart", { userid });
    //         console.log("Cart Data:", res.data.data); // Debugging log
    //         setDetails(res.data.data || []);

    //         const itemCounts = {};
    //         const itemSizes = {};
    //         if (res.data.cart && res.data.cart.products) {
    //             res.data.cart.products.forEach(product => {
    //                 itemCounts[product.productId] = product.quantity;
    //                 itemSizes[product.productId] = product.size;
    //             });
    //         }
    //         console.log("Quantities:", itemCounts); // Debugging log
    //         setQuantities(itemCounts);
    //         setSize(itemSizes);
    //     } catch (error) {
    //         console.error("Error fetching cart data: ", error);
    //     }
    // };

    console.log(product,"pro");

    const calculateTotal = () => {
        return details.reduce((total, item) => {
            const itemQuantity = quantities[item._id] || item.quantity;
            return total + (offerPrice(item) * itemQuantity);
        }, 0);
    };

    const offerPrice = (data) => {
        if (!data || !data.Price) {
            return 0;
        }

        const Price = parseInt(data.Price);
        const Discount = parseInt(data.Discount || 0);

        if (isNaN(Price)) {
            return 0;
        }

        if (isNaN(Discount) || Discount === 0) {
            return Price;
        }

        return Price - (Price * Discount / 100);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <div
                id="order-success-card"
                className="bg-white rounded-lg shadow-lg p-6 md:p-12 transition-all duration-500 transform opacity-0 translate-y-10" data-aos='fade-down'>
                <div className="flex flex-col items-center">
                    <CheckCircleIcon className="h-24 w-24 text-green-500 mb-4 animate-bounce" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Successful!</h2>
                    <p className="text-gray-700 mb-4 text-center">
                        Thank you for your purchase. Your order has been placed successfully.
                    </p>
                    <div className="bg-gray-100 rounded-lg p-4 w-full mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Order Details</h3>
                        {data && (
                            <>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium">Order ID:</span> {data._id}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium">Order Date:</span> {new Date(data.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium">Total Amount:</span> INR: {data.TotalPrice}
                                </p>
                                <p className="text-gray-600 mb-4">
                                    <span className="font-medium">Payment:</span> {data.PaymentMethod}
                                </p>
                            </>
                        )}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {product && product.length > 0? (
                                product.map((item) => (
                                    <div key={product._id} className="flex items-center bg-white rounded-lg shadow p-4 transition duration-300 transform hover:scale-105">
                                        <img src={`/uploadedimages/${item.images && item.images[0] ? item.images[0] : 'default-image.jpg'}`} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-800">{item.Name}</h4>
                                            <p className="text-gray-600">Quantity: {quantities[item._id]}</p>
                                            <p className="text-gray-600">Price: {offerPrice(item)}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No products found for this order.</p>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            to="/productsection"
                            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center space-x-2 transform hover:scale-105"
                        >
                            <ShoppingCartIcon className="h-5 w-5" />
                            <span>Continue Shopping</span>
                        </Link>
                        <Link
                            to={`/trackorder/${data._id}`}
                            className="bg-white hover:bg-gray-100 border-black shadow-md text-black font-bold py-2 px-4 rounded transition duration-300 flex items-center space-x-2 transform hover:scale-105"
                        >
                            <DocumentTextIcon className="h-5 w-5" />
                            <span>View Order Details</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
