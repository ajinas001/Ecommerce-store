import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Trackorder = () => {
    const { _id } = useParams();
    const [details, setDetails] = useState({});
    const [quantities, setQuantities] = useState({});
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState({});
    const [address, setAddress] = useState({});

    useEffect(() => {
        console.log(_id,"orderid");
        axios.post('http://localhost:4005/user/vieworder', { orderid:_id }).then((res) => {
            console.log(res);
            const orderData = res.data.data;
            setAddress(res.data.data.UserAddress || {});
            setDetails(orderData);
            const itemCounts = {};
            const itemSizes = {};
            if (orderData && orderData.products) {
                orderData.products.forEach(product => {
                    itemCounts[product.productId] = product.quantity;
                    itemSizes[product.productId] = product.size;
                });
            }
            setQuantities(itemCounts);
            setProducts(res.data.products);
            setSizes(itemSizes);
        }).catch((err) => {
            console.error(err);
        });
    }, [_id]);


    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto p-16 bg-white shadow-lg rounded-lg mt-16 mb-8">
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold ">
                        Order ID : <span className="truncate w-24">{details._id}</span>
                    </h1>
                    <button className="px-4 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800">
                        VIEW INVOICE
                    </button>
                </div>
                <p className="text-gray-500 mb-4">
                    Order placed on <span className="font-semibold">April 1, 2023</span>
                </p>

                <div className="flex flex-col">
                    <div className="flex flex-wrap justify-between mb-8 gap-8">
                        {products.map((product) => (
                            <div key={product.productId} className="flex flex-wrap items-center gap-8 w-full lg:w-auto">
                                <img src={`/uploadedimages/${product.images && product.images[0] ? product.images[0] : 'default-image.jpg'}`}
                                    alt={product.Name}
                                    className="w-32 h-32 object-cover rounded-md mb-4 lg:mb-0"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold truncate sm:w-auto lg:w-40">{product.Name}</h2>
                                    <p className="text-lg text-gray-700">INR : {product.Price}</p>
                                    <p className="text-gray-500 my-2">Quantity: {quantities[product._id]}</p>
                                    <p className="text-gray-500"><span className="font-semibold">Size:</span> {sizes[product._id]}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between mb-8 gap-8">
                        <div className="flex flex-col lg:w-1/2">
                            <h3 className="font-semibold">Packing Address</h3>
                            <p className="text-gray-500">362 Ridgewood, Alaska 99669, USA</p>
                        </div>
                        <div className="flex flex-col lg:w-1/2">
                            <h3 className="font-semibold">Delivery Updates</h3>
                            <p className="text-gray-500"> {address.Address}, {address.City}, {address.State} - {address.PinCode}</p>
                            <p className="text-gray-500">{details.Email} , {details.Phone}</p>
                           
                            <button className="mt-2 px-6 py-1 border rounded hover:bg-gray-200">EDIT</button>
                        </div>
                    </div>

                    <div className="py-4 mb-8 relative">
                        <p className="text-black mb-4 text-center font-bold">
                            Preparing to Deliver on <span className="font-semibold">April 8, 2023</span>
                        </p>
                        <div className="flex justify-between items-center relative z-10">
                            <div className="text-center flex-1">
                                <div className="flex justify-center items-center">
                                    <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center text-white">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 mt-2">ORDER-PLACED</p>
                            </div>
                            <div className="text-center flex-1">
                                <div className="flex justify-center items-center">
                                    <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center text-white">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 mt-2">SHIPPED</p>
                            </div>
                            <div className="text-center flex-1">
                                <div className="flex justify-center items-center">
                                    <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center text-white">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 mt-2">IN-TRANSIT</p>
                            </div>
                            <div className="text-center flex-1">
                                <div className="flex justify-center items-center">
                                    <div className="bg-gray-500 rounded-full h-8 w-8 flex items-center justify-center text-white">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19l-7-7 3-3L9 13l7-7 3 3-7 7z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-gray-500 mt-2">DELIVERED</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-2">Billing Address</h3>
                        <p className="text-gray-500">362 Ridgewood Dr, Soldotna, Alaska 99669, USA</p>
                        <h3 className="font-semibold mt-4 mb-2">Payment information</h3>
                        <div className="flex items-center">{details.PaymentMethod?<p>{details.PaymentMethod}</p>:null}
                            {/* <img src="../images/gpay.png" alt="Gpay" className="mr-2 h-10 w-10" />
                            <p className="text-gray-500">Gpay</p> */}
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-gray-500">
                                <p>Subtotal</p>
                                <p>{details.TotalPrice}</p>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <p>Shipping estimate</p>
                                <p>0</p>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <p>Tax estimate</p>
                                <p>0</p>
                            </div>
                            <div className="flex justify-between font-medium mt-2 text-gray-500">
                                <p>Total</p>
                                <p>INR : {details.TotalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trackorder;
