import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Aos from 'aos';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, setInCart, fetchCart } from '../../Redux/CartSlice';

function Homeproducts() {
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch();
    const userid = localStorage.getItem('id');

    const cart = useSelector((state) => state.cart.items);
    const incart = useSelector((state) => state.cart.incart);

    useEffect(() => {
        axios.get('http://localhost:4005/user/viewproduct').then((res) => {
            console.log('Products response:', res);
            setProduct(res.data.data);
        });

        // Fetch cart details
        dispatch(fetchCart(userid));
    }, [dispatch, userid]);

    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

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

    return (
        <>
            <div className="text-center p-5 mt-8">
                <h1 className="font-bold text-3xl">Explore our products</h1>
            </div>
            <section
    id="Projects"
    className="w-fit mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-y-20 gap-x-14 mt-10 mb-5"
    data-aos="zoom-in"
>
    {product.map((data) => (
        <div 
            key={data._id} 
            className="w-64 sm:w-72 bg-white rounded-xl duration-500 hover:scale-105"
        >
            <a href={`/viewproductdetails/${data._id}`} className="relative h-32 sm:h-80 w-32 sm:w-72 block">
                <img
                    src={`/uploadedimages/${data.images[0]}`}
                    className="absolute h-64 sm:h-80 w-64 sm:w-72 top-0 left-0 object-cover rounded-t-xl transition-opacity duration-300 opacity-100 hover:opacity-0"
                />
                <img
                    src={`/uploadedimages/${data.images[1]}`}
                    className="absolute h-64 sm:h-80 w-64 sm:w-72 top-0 left-0 object-cover rounded-t-xl transition-opacity duration-300 opacity-0 hover:opacity-100"
                />
            </a>
            <div className="px-4 py-3 w-64 sm:w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">{data.Category}</span>
                <p className="text-lg font-semibold text-black truncate block capitalize">
                    {data.Name}
                </p>
                <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">
                        {data.Price}
                    </p>
                    {incart[data._id] ? (
                        <button className="ml-auto" onClick={() => handleRemoveFromCart(data._id)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="black"
                                className="bi bi-bag-x"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 7a.5.5 0 0 1 .5.5v1.293l1.354-1.353a.5.5 0 1 1 .708.707L9.207 9.5l1.354 1.354a.5.5 0 1 1-.707.707L8.5 10.207 7.146 11.56a.5.5 0 1 1-.707-.707L7.793 9.5 6.44 8.146a.5.5 0 1 1 .707-.707L8 8.793V7.5A.5.5 0 0 1 8 7z"
                                />
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5
zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg>
                        </button>
                    ) : (
                        <button className="ml-auto" onClick={() => handleAddToCart(data._id)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="currentColor"
                                className="bi bi-bag-plus"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                                />
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    ))}
</section>


        </>
    );
}

export default Homeproducts;
