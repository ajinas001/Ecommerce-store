import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCart, removeFromCart, setInCart } from '../../Redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';


function Singleproduct() {
    const [products, setProducts] = useState([]);
    // const [incart, setInCart] = useState({});
    const userid = localStorage.getItem('id');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.items);
    const incart = useSelector((state) => state.cart.incart);

    useEffect(() => {
        axios.get('http://localhost:4005/user/viewofferproduct')
            .then((res) => {
                console.log(res);
                setProducts(res.data.data);
                dispatch(fetchCart(userid));
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
            });
    }, [dispatch]);

    // useEffect(() => {

    //     axios.post('http://localhost:4005/cart/viewcart', { userid: userid })
    //         .then((res) => {
    //             console.log(res);
    //             const userData = res.data.data
    //             console.log(userData, "userdata");
    //             if (userData) {
    //                 // Check if any item in userData has the same _id as the one you're interested in
    //                 setInCart(userData.some(item => item._id === _id));
    //                 console.log(incart, "incart");
    //                 dispatch(fetchCart(userid));

    //             }
    //         })
    //         .catch((err) => console.error("Error fetching user details:", err));

    // }, [dispatch])
    const handleAddToCart = (productId) => {
        dispatch(addToCart({ userid, productId, quantity: 1 }))
            .then(() => {
                dispatch(setInCart({ productId, isInCart: true }));
                toast.success('Added to cart');
            })
            .catch((error) => {
                console.error('Failed to add to cart:', error);
                toast.error('Failed to add to cart');
            });
    };
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart({ userid, productId }))
            .then(() => {
                dispatch(setInCart({ productId, isInCart: false }));
                toast.success('Removed from cart');
            })
            .catch((error) => {
                console.error('Failed to remove from cart:', error);
                toast.error('Failed to remove from cart');
            });
    };

    const offerprice = (data) => {
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

        const discountedPrice = Price - (Price * Discount / 100);
        return discountedPrice.toFixed(0);
    };

    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    return (
        <>
            {products && products.map((data, key) => (
                <div key={data._id} className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg duration-500 hover:scale-105  bg-white " data-aos='fade-right'>
                    <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl " href={`/viewproductdetails/${data._id}`}>
                        <div className="relative w-full h-full">
                            <img
                                className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 opacity-100 hover:opacity-0"
                                src={`/uploadedimages/${data.images[0]}`}
                                alt=""
                            />
                            <img
                                className="absolute inset-0 object-cover w-full h-full transition-opacity duration-300 opacity-0 hover:opacity-100"
                                src={`/uploadedimages/${data.images[1]}`}
                                alt=""
                            />
                        </div>
                        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                            {data.Discount}% OFF
                        </span>
                    </a>

                    <div className="mt-4 px-5 pb-5">
                        <a href={`/viewproductdetails/${data._id}`}>
                            <h5 className="text-xl tracking-tight text-slate-900 truncate w-44">
                                {data.Name}
                            </h5>
                        </a>
                        <div className="mt-2 mb-5 flex items-center justify-between">
                            <p>
                                <span className="text-2xl font-bold text-slate-900">INR {offerprice(data)}</span><br />
                                <span className="text-sm text-slate-900 line-through">INR {data.Price}</span>
                            </p>
                        </div>
                        {incart[data._id] ? (
                            <button
                                onClick={() => handleRemoveFromCart(data._id)}
                                className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                Remove from cart
                            </button>
                        ) : (
                            <button
                                onClick={() => handleAddToCart(data._id)}
                                className="flex items-center justify-center w-full rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                Add to cart
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}

export default Singleproduct;
