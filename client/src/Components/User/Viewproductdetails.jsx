import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';
import Aos from 'aos';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, setInCart, fetchCart } from '../../Redux/CartSlice';
import { addTowishlist, fetchwishlist, removeFrowishlist } from '../../Redux/WishSlice';

function Viewproductdetails() {
    const { _id } = useParams();

    const [data, setdata] = useState();
    const [similar, setsimilar] = useState(null);
    const [decodeddata, setdecodeddata] = useState();
    const userid = localStorage.getItem("id");
    const [inwishlist, setinwishlist] = useState(false);
    const [selectedSize, setSelectedSize] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const incart = useSelector((state) => state.cart.incart);
    const role = localStorage.getItem("role")
   
    useEffect(()=>{
        if(!role){
            navigate('/register')
            toast.error("Please login")
        }
    },[])

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.post('http://localhost:4005/login/verify');
                console.log(res.data.data, "data");
                setdecodeddata(res.data.data);
            } catch (err) {
                console.log(err);
                navigate('/');
                toast.error("Authorization failed. Please login again.");
            }
        };

        verifyUser();
    }, [navigate]);

    useEffect(() => {
        if (decodeddata) {
            console.log(decodeddata, "decodeddata");
            if (decodeddata.role !== 1) {
                console.log("err");
                navigate('/');
                toast.error("Authorization failed. Please login again.");
            } else {
                dispatch(fetchwishlist(userid));
            }
        }
    }, [decodeddata, navigate, dispatch, userid]);

    useEffect(() => {
        axios.post(`http://localhost:4005/user/viewproductdetails/${_id}`)
            .then((res) => {
                setdata(res.data.data);
                setMainImage(res.data.data.images[0]);
                setSelectedSize(res.data.data.Size.split(',')[0]); // Set the first size as the default
            })
            .catch((err) => console.error("Error fetching product details:", err));

        axios.post('http://localhost:4005/user/viewuserdetails', { _id: userid })
            .then((res) => {
                const userData = res.data.data[0];
                if (userData) {
                    setinwishlist(userData.wishlist.includes(_id));
                }
            })
            .catch((err) => console.error("Error fetching user details:", err));

        Aos.init({ duration: 1500 });
    }, [_id, userid]);

    useEffect(() => {
        axios.post('http://localhost:4005/cart/viewcart', { userid: userid })
            .then((res) => {
                const userData = res.data.data;
                if (userData) {
                    setInCart(userData.some(item => item._id === _id));
                    dispatch(fetchCart(userid));
                }
            })
            .catch((err) => console.error("Error fetching user details:", err));
    }, [dispatch, userid, _id]);

    useEffect(() => {
        if (data) {
            axios.post('http://localhost:4005/user/similarproducts', { Category: data.Category })
                .then((res) => {
                    setsimilar(res.data.data.filter(item => item._id !== _id));
                })
                .catch((err) => console.error("Error fetching similar products:", err));
        }
    }, [data, _id]);

    const handleAddToCart = (productId) => {
        dispatch(addToCart({ userid, productId, quantity: 1, size: selectedSize }))
            .then(() => {
                dispatch(setInCart({ productId, isInCart: true }));
                toast.success('Added to cart');
            })
            .catch((error) => {
                console.error('Failed to add to cart:', error);
                toast.error('Failed to add to cart');
            });
    };

    const handleAddToWishlist = (productId) => {
        dispatch(addTowishlist({ userid, productId }))
            .then(() => {
                toast.success('Added to wishlist');
                setinwishlist(true);
            })
            .catch((error) => {
                console.error('Failed to add to wishlist:', error);
                toast.error('Failed to add to wishlist');
            });
    };

    const handleRemoveFromWishlist = (productId) => {
        dispatch(removeFrowishlist({ userid, productId }))
            .then(() => {
                toast.success('Removed from wishlist');
                setinwishlist(false);
            })
            .catch((error) => {
                console.error('Failed to remove from wishlist:', error);
                toast.error('Failed to remove from wishlist');
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
        return discountedPrice;
    }

    const size = data;
    const value = size && size.Size;
    const values = value && value.split(',');

    const [mainImage, setMainImage] = useState(data?.images?.[0] || '');

    useEffect(() => {
        if (data && data.images && data.images.length > 0) {
            setMainImage(data.images[0]);
        }
    }, [data]);

    const handleImageClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    if (!data) {
        return null;
    }

    return (
        <>
            <Navbar />

            {data &&
                <section className="pt-12 sm:py-16  lg:mx-20 mt-4" data-aos='fade-down'>
                    <div className="container mx-auto px-4">
                        <nav className="flex">
                            <ol role="list" className="flex items-center">
                                <li className="text-left">
                                    <div className="-m-1">
                                        <a
                                            href="/userhome"
                                            className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                        >
                                            {" "}
                                            Home{" "}
                                        </a>
                                    </div>
                                </li>
                                <li className="text-left">
                                    <div className="flex items-center">
                                        <span className="mx-2 text-gray-400">/</span>
                                        <div className="-m-1">
                                            <a
                                                href="/productsection"
                                                className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                            >
                                                {" "}
                                                Products{" "}
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="text-left">
                                    <div className="flex items-center">
                                        <span className="mx-2 text-gray-400">/</span>
                                        <div className="-m-1">
                                            <a
                                                href="#"
                                                className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                                aria-current="page"
                                            >
                                                {" "}
                                                {data.Name}{" "}
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                            <div className="lg:col-span-3 lg:row-end-1">
                                <div className="lg:flex lg:items-start">
                                    {/* <div className="lg:order-2 lg:ml-5">
                                        <div className="max-w-xl overflow-hidden rounded-lg relative ">
                                            <img
                                                className="h-full w-full max-w-full object-cover lg:max-400px"
                                                src={`/uploadedimages/${mainImage}`}
                                                alt="#"
                                            />
                                            {data.Discount && data.Discount > 0 ?<span className="absolute-auto top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                                                {data.Discount}% OFF
                                            </span>:null}
                                        </div>
                                       
                                    </div> */}
                                    <div className="lg:order-2 lg:ml-5">
                                        <div className="max-w-xl overflow-hidden rounded-lg relative">
                                            <img
                                                className="h-full w-full max-w-full object-cover lg:max-w-400px"
                                                src={`/uploadedimages/${mainImage}`}
                                                alt={data.Name}
                                            />
                                            {data.Discount && data.Discount > 0 ? (
                                                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                                                    {data.Discount}% OFF
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                        <div className="flex flex-row items-start lg:flex-col">
                                            {data.images && data.images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                                                    onClick={() => handleImageClick(image)}
                                                >
                                                    <img
                                                        className="h-full w-full object-cover"
                                                        src={`/uploadedimages/${image}`}
                                                        alt=""
                                                    />

                                                </button>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">

                                <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                                    {data.Name}
                                </h1>

                                <div className="mt-5 flex items-center">
                                    <div className="flex items-center">
                                        <svg
                                            className="block h-4 w-4 align-middle text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                className=""
                                            />
                                        </svg>
                                        <svg
                                            className="block h-4 w-4 align-middle text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                className=""
                                            />
                                        </svg>
                                        <svg
                                            className="block h-4 w-4 align-middle text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                className=""
                                            />
                                        </svg>
                                        <svg
                                            className="block h-4 w-4 align-middle text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                className=""
                                            />
                                        </svg>
                                        <svg
                                            className="block h-4 w-4 align-middle text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                className=""
                                            />
                                        </svg>
                                    </div>
                                    <p className="ml-2 text-sm font-medium text-gray-500">
                                        1,209 Reviews
                                    </p>
                                    {/* {data.Discount && data.Discount > 0 ? <span className="ml-auto top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                                        {data.Discount}% OFF
                                    </span> : null} */}

                                </div>
                                <h2 className="mt-8 text-base text-gray-900">Stock</h2>
                                <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                                    {data.Stock > 5 ? <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                                        <span className=''>Avaliable</span>
                                    </p> : data.Stock < 5 && data.Stock > 0 ? <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                                        <span className=''>{data.Stock} items left</span>
                                    </p> : <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                                        <span className=''>Out of Stock</span>
                                    </p>}



                                    <div className='' >
                                        {inwishlist == true ? <button
                                            onClick={() => { handleRemoveFromWishlist(data._id) }}
                                            type="button"
                                        >

                                            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold flex bg-black text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>  <span className='pl-2'>Remove from wishlist</span>
                                            </p>
                                        </button> : <button
                                            onClick={() => { handleAddToWishlist(data._id) }}
                                            type="button"
                                        >

                                            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold flex bg-black text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>  <span className='pl-2'>Add to wishlist</span>
                                            </p>
                                        </button>}

                                    </div>
                                </div>
                                <h2 className="mt-8 text-base text-gray-900">Available Sizes</h2>
                                <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                                    {values && values.map((item, key) => (
                                        <label key={key} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="size"
                                                value={item}

                                                onChange={() => setSelectedSize(item)}

                                                // defaultValue={item[1]} 
                                                defaultChecked={key === 1}
                                                className="peer sr-only"
                                            />
                                            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                                                {item}
                                            </p>
                                        </label>
                                    ))}


                                </div>


                                {/* </div> */}
                                <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                                    <div className="flex items-end">
                                        {data.Discount && data.Discount > 0 ? <div className="mt-2 mb-5 flex items-center justify-between">
                                            <p>
                                                <span className="text-2xl font-bold text-slate-900">INR {offerprice(data)}</span><br />
                                                <span className="text-sm text-slate-900 line-through">INR {data.Price}</span>
                                            </p>
                                        </div> : <h1 className="text-3xl font-bold">INR {data.Price}</h1>}

                                        {/* <span className="text-base">/month</span> */}
                                    </div>

                                    {data.Stock > 0 ? (
                                        incart[data._id] ? (
                                            <button
                                                onClick={() => { handleRemoveFromCart(data._id) }}
                                                type="button"
                                                className="w-auto inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="shrink-0 mr-3 h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                    />
                                                </svg>
                                                Remove
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => { handleAddToCart(data._id) }}
                                                type="button"
                                                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="shrink-0 mr-3 h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                    />
                                                </svg>
                                                Add to cart
                                            </button>
                                        )
                                    ) : null}



                                </div>


                                <ul className="mt-8 space-y-2">
                                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                        <svg
                                            className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                className=""
                                            />
                                        </svg>
                                        Free shipping worldwide
                                    </li>
                                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                        <svg
                                            className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                className=""
                                            />
                                        </svg>
                                        Cancel Anytime
                                    </li>
                                </ul>
                            </div>
                            <div className="lg:col-span-8">
                                <div className="border-b border-gray-300">

                                </div>



                                <div className="bg-white">
                                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                        <section id="2">
                                            {similar !== null && similar.length > 0 ? (
                                                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                                    Similar Recommended Products
                                                </h2>
                                            ) : null}

                                            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                                                {similar && similar.length > 0 && similar.map((item, key) => (
                                                    <div key={key} className="group relative">
                                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                            <img
                                                                src={`/uploadedimages/${item.images[0]}`}
                                                                alt="Front of men's Basic Tee in black."
                                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                            />
                                                            {item.Discount && item.Discount > 0 ? (
                                                                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                                                                    {item.Discount}% OFF
                                                                </span>
                                                            ) : null}
                                                            {inwishlist == true ? <a href="/wishlist" title="">
                                                                <button className="mr-3 absolute top-0 right-0">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                                    </svg>
                                                                </button>
                                                            </a> : null}

                                                        </div>
                                                        <div className="mt-4 flex justify-between">
                                                            <div>
                                                                <h3 className="text-sm text-gray-700">
                                                                    <a href={`/viewproductdetails/${item._id}`}>
                                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                                        {item.Name}
                                                                    </a>
                                                                </h3>
                                                                <p className="mt-1 text-sm text-gray-500">{item.Category}</p>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <p className="text-sm font-medium text-gray-900">{offerprice(item)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section >
            }






        </>
    )
}

export default Viewproductdetails
