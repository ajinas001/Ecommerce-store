import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { FiUser, FiGift, FiCreditCard, FiShoppingBag, FiStar, FiMapPin, FiEye, FiHeart, FiMenu, FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../Redux/CartSlice';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { fetchwishlist } from '../Redux/WishSlice';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 50,
    p: 4,
};

let role = localStorage.getItem("role")
let userid = localStorage.getItem("id")
let pic = localStorage.getItem("pic")

axios.defaults.withCredentials = true

function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [decodeddata, setdecodeddata] = useState();

    const inputref = useRef();
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalwishlist = useSelector(state => state.wishlist.totalwishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(totalQuantity, "cartcount");
    // console.log(totalwishlist, "wishlistcount")

    // useEffect(() => {
    //     const verifyUser = async () => {
    //         try {
    //             setLoading(true)
    //             const res = await axios.post('http://localhost:4005/login/verify');
    //             console.log(res.data.data, "data decoded");
    //             console.log(res.data.data.role, "role");
    //             setdecodeddata(res.data.data);
    //             role= res.data.data?.role
    //             userid = res.data.data?._id
    //             if (res.data.data?.role == "1") {
    //                 window.location.reload();
    //                 navigate('/userhome');
    //             } else {
    //                 navigate("/adminhome");
    //             }
    //             setLoading(false); // Set loading to false after login
    //         } catch (err) {
    //             console.log(err);
    //             setLoading(true)
    //             navigate('/');
    //             // toast.error("Authorization failed. Please login again.");
    //             setLoading(false)
    //         }
    //     };

    //     verifyUser();
    // }, [role,userid]);


    useEffect(() => {
        if (userid) {
            dispatch(fetchwishlist(userid));
        }
    }, [dispatch, userid]);

    useEffect(() => {
        if (userid) {
            dispatch(fetchCart(userid));
        }
    }, [dispatch, userid]);

    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (userid) {
            setLoading(true); // Set loading to true when starting data fetch
            axios.post('http://localhost:4005/user/viewuserdetails', { _id: userid })
                .then((res) => {
                    console.log("User Details Response:", res.data);
                    setDetails(res.data.data);
                    setLoading(false); // Set loading to false when data is fetched
                })
                .catch((err) => {
                    console.error('Error fetching user details:', err);
                    setLoading(false); // Set loading to false on error
                });
        } else {
            console.error('User ID is not set');
        }
    }, [userid]);

    // useEffect(() => {
    //     if (userid) {
    //         setLoading(true); // Set loading to true when starting data fetch
    //         axios.post("http://localhost:4005/cart/viewcart", { userid: userid })
    //             .then((res) => {
    //                 console.log("Cart API Response:", res.data);
    //                 if (res.data.data) {
    //                     setCartCount(res.data.data.length);
    //                 } else {
    //                     console.log("No products found in the cart");
    //                     setCartCount(0); // Explicitly set to 0 if no products
    //                 }
    //                 setLoading(false); // Set loading to false when data is fetched
    //             })
    //             .catch((err) => {
    //                 console.error('Error fetching cart data:', err);
    //                 setCartCount(0); // Explicitly set to 0 on error
    //                 setLoading(false); // Set loading to false on error
    //             });
    //     } else {
    //         console.error('User ID is not set');
    //     }
    // }, [userid]);

    // console.log("Details:", details);

    const wishlistLength = details.length > 0 && details[0]?.wishlist ? details[0].wishlist.length : 0;
    // console.log("Cart length:", cartCount);
    // console.log("wishlist length:", wishlistLength);

    useEffect(() => {
        if (open) {
            // Focus on input field when modal is opened
            inputref.current && inputref.current.focus();
        }
    }, [open]);

    const [data, setdata] = useState({
        email: "",
        password: ""
    });
    const [gdata, setgdata] = useState();

    const handleonchange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setdata({ ...data, [name]: value });
    };

    const handlelogin = (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when login starts
        axios.post('http://localhost:4005/login/login', data).then((res) => {
            console.log(res);
            // const verifyUser = async () => {
            //     try {
            //         setLoading(true)
            //         const res = await axios.post('http://localhost:4005/login/verify');
            //         console.log(res.data.data, "data decoded");
            //         console.log(res.data.data.role, "role");
            //         setdecodeddata(res.data.data);
            //         role = res.data.data?.role
            //         userid = res.data.data?._id
            //         console.log(role, "role");
            //         console.log(userid, "userid");
            //         // if (role == "1") {
            //         //     // window.location.reload();
            //         //     navigate('/userhome');
            //         // } else {
            //         //     navigate("/adminhome");
            //         // }
            //         setLoading(false); // Set loading to false after login
            //     } catch (err) {
            //         console.log(err);
            //         setLoading(true)
            //         navigate('/');
            //         localStorage.clear()
            //         window.location.reload()
            //         toast.error("Authorization failed. Please login again.");
            //         setLoading(false)
            //     }
            // };

            // verifyUser();
            toast.success(res.data.message);
            handleClose();
            localStorage.setItem("role", res.data.data.role);
            localStorage.setItem("id", res.data.data._id);
            // localStorage.setItem("profileimage", res.data.data._id);

            if (res.data.data.role == "1") {
              
                navigate('/userhome');
            } else {
                navigate("/adminhome");
            }
            window.location.reload();
            setLoading(false); // Set loading to false after login
        })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message);
                setLoading(false); // Set loading to false on error
            });
    };



    const handleSuccess = async (credentialResponse) => {
        try {
            console.log(credentialResponse);
            const token = credentialResponse.credential;
            const decoded = jwtDecode(token);
            console.log(decoded);
            toast.success("Google login success");

            // Example function to set global data (make sure it's defined properly)
            setgdata(decoded);

            // Process the data as needed, for example, sending it to your backend
            const response = await axios.post("http://localhost:4005/login/glogin", decoded, { withCredentials: true });
            
            handleClose(); // Ensure handleClose is defined in your component
            
            console.log(response);
            localStorage.setItem("role", response.data.data.role);
            localStorage.setItem("id", response.data.data._id);
            localStorage.setItem("pic", response.data.picture);

            if (response) {
                navigate("/userhome");
                window.location.reload();
            }
            
        } catch (error) {
            console.error('Error during Google login:', error);
            toast.error("Google login failed");
        } finally {
            setLoading(false); // Ensure setLoading is defined in your component
        }
    };

    const handleFailure = () => {
        console.log('Login Failed');
        toast.error("Google login failed");
    };



    const login = useGoogleLogin({
        onSuccess: async codeResponse => {
            setLoading(true);
            try {
                // Get the token from codeResponse
                console.log(codeResponse);
                const token = codeResponse.access_token;

                // Ensure the token is valid
                if (typeof token !== 'string') {
                    throw new Error('Invalid token format');
                }

                // Decode the token
                const decodedData = jwtDecode(token);
                setgdata(decodedData);

                // Process the data as needed, for example, sending it to your backend
                const response = await axios.post("http://localhost:4005/login/glogin", decodedData, { withCredentials: true });
                handleClose();
                localStorage.setItem("role", response.data.data.role);
                localStorage.setItem("id", response.data.data._id);
                localStorage.setItem("pic", response.data.data.picture);
                navigate("/userhome");
                window.location.reload();
                setLoading(false);

                toast.success("Google login success");
            } catch (error) {
                console.error('Error during Google login:', error);
                setLoading(false);
                toast.error("Google login failed");
            }
        },
        onError: () => {
            console.log('Login Failed');
            toast.error("Google login failed");
        },
        flow: 'auth-code',
    });


    const handlelogout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }

    return (
        <>
            {loading ? (
                <div><div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                    <span class='sr-only'>Loading...</span>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                </div></div>
            ) : (
                <>
                    {role == 1 ?
                        <div className="fixed top-0 left-0 right-0 bg-white z-10 sm:mx-5 md:mx-14" data-aos='fade-up'>
                            <header className="">
                                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                                    <div className="flex items-center justify-between h-16 lg:h-20">

                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            className="inline-flex p-1 text-black transition-all duration-200"
                                        >
                                            {/* Menu open: "hidden", Menu closed: "block" */}
                                            <svg
                                                className={`${menuVisible ? 'hidden' : 'block'} w-6 h-6`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                            </svg>
                                            <h2 className='px-3'>Menu</h2>
                                            {/* Menu open: "block", Menu closed: "hidden" */}
                                            <svg
                                                className={`${menuVisible ? 'block' : 'hidden'} w-6 h-6`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                        <div className="flex-shrink-0">

                                            <a href="#" title="" className="flex">
                                                {/* <img
                                            className="w-30 h-20 "
                                            src="../images/shoplogo1.png"
                                            alt=""
                                        /> */}
                                                <a href='/userhome'>
                                                    <h3 className=' py-1 text-center  font-bold text-2xl rounded-lg'>SHOPIFY</h3>
                                                </a>
                                            </a>
                                        </div>
                                        <div className='flex items-center justify-between h-16 lg:h-20'>
                                            <div class="relative flex items-center hidden sm:flex ">
                                                <a
                                                    onClick={handleOpen}
                                                    title=""
                                                    href='/cart'
                                                    className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1 px-4 lg:px-4 flex items-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                    </svg>

                                                </a>
                                                {totalQuantity > 0 ?
                                                    <span class="absolute top-0 right-3 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{totalQuantity}</span>
                                                    : null}
                                                {/* <span class="absolute top-0 right-3 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{totalQuantity}</span> */}
                                                {/* {cartCount > 0 ?
                                                    <span class="absolute top-0 right-3 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{cartCount}</span>
                                                    :
                                                    null} */}

                                            </div>

                                            <div class="relative flex items-center hidden sm:flex ">
                                                <a href="/wishlist" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1 px-4 lg:px-4 flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                    </svg>

                                                </a>
                                                {totalwishlist > 0 ?
                                                    <span class="absolute top-0 right-3 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{totalwishlist}</span>
                                                    : null

                                                }
                                            </div>

                                            <a
                                                title=""
                                                onClick={toggleDropdown}
                                                className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1 px-4 lg:px-4 flex items-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                </svg>

                                            </a>

                                            {/* <a
                                                title=""
                                                onClick={toggleDropdown}
                                                className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1 px-4 lg:px-4 flex items-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                </svg>

                                            </a> */}
                                            {isOpen && (
                                                <div className="absolute right-10 mt-32 w-48 bg-white rounded-lg shadow-lg z-10">
                                                    {/* <a
                                                    href="profile"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                                >
                                                    View Profile
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                                    onClick={handlelogout}
                                                >
                                                    Logout
                                                </a> */}
                                                    <Link to={'/profile'}>
                                                        <li className="flex items-center p-2 text-gray-800 hover:bg-blue-100 rounded">
                                                            {pic ? (
                                                                <>
                                                                    <img src={pic} alt='picture' className="rounded-full w-5 h-5" />
                                                                    <span className='ms-2'>Profile</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FiUser className="mr-2 text-black" />
                                                                    <span>Profile</span>
                                                                </>
                                                            )}
                                                        </li>
                                                    </Link>

                                                    <li className="flex items-center p-2 text-gray-800 hover:bg-red-100 rounded" onClick={handlelogout} >
                                                        <FiLogOut className="mr-2 text-red-500" /> Logout
                                                    </li>
                                                </div>
                                            )}
                                        </div>

                                        {/* <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                                    <a
                                        href="/userhome"
                                        title=""
                                        className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                    >
                                        Home
                                    </a>
                                    <a
                                        href="#"
                                        title=""
                                        className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                    >
                                        Products
                                    </a>
                                    <a
                                        href="#"
                                        title=""
                                        className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                    >
                                        Contact
                                    </a>
                                    <a
                                        href="#"
                                        title=""
                                        className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                    >
                                        About
                                    </a>
                                    <div className="w-px h-5 bg-black/20"></div>
                                    <a
                                        onClick={handleOpen}
                                        title=""
                                        href='/cart'
                                        className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>
    
                                    </a>
                                    <a
                                        href="/wishlist"
                                        title=""
                                        className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                        role="button"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
    
                                    </a>
                                    <a
                                        title=""
                                        onClick={handlelogout}
                                        className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
    
    
                                    </a>
                                </div> */}

                                    </div>
                                </div>
                            </header>
                            <div className={`${menuVisible ? 'block' : 'hidden'} px-4 py-2`} id="menuItems">
                                <a
                                    onClick={toggleMenu}
                                    href="/userhome"
                                    title=""
                                    className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                >
                                    Home
                                </a>
                                <a
                                    onClick={toggleMenu}
                                    href="/productsection"
                                    title=""
                                    className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                >
                                    Men
                                </a>
                                <a
                                    onClick={toggleMenu}
                                    href="/productsection"
                                    title=""
                                    className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                >
                                    women
                                </a>
                                <a
                                    onClick={toggleMenu}
                                    href="/productsection"
                                    title=""
                                    className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                >
                                    Men's shoes
                                </a>
                                <a
                                    onClick={toggleMenu}
                                    href="/productsection"
                                    title=""
                                    className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                >
                                    Women's shoes
                                </a>
                                <a
                                    onClick={toggleMenu}
                                    href="/productsection"
                                    title=""
                                    className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                >
                                    Bags
                                </a>
                                <div className="w-full h-px my-2 bg-black/20"></div>
                                <div class="relative">
                                    <a
                                        onClick={handleOpen}
                                        title=""
                                        href='/cart'
                                        className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                        </svg>

                                    </a>
                                    {totalQuantity > 0 ?
                                        <span class="absolute top-0 left-5  bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{totalQuantity}</span>
                                        : null}
                                </div>
                                <div class="relative">
                                    <a href="/wishlist" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1" role="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                    </a>
                                    {totalwishlist > 0 ?
                                        <span class="absolute top-0 left-5 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{totalwishlist}</span>
                                        :
                                        <span class="absolute top-0 left-5 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">{totalwishlist}</span>
                                    }
                                </div>

                                <a

                                    title=""
                                    onClick={handlelogout}
                                    className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>


                                </a>
                            </div>
                        </div>
                        : role == 0 ? <div className="fixed top-0 left-0 right-0 bg-white z-10 sm:mx-5 md:mx-14" data-aos='fade-up'>
                            <header className="">
                                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                                    <div className="flex items-center justify-between h-16 lg:h-20">
                                        <div className="flex-shrink-0">
                                            <a href="#" title="" className="flex">
                                                <img
                                                    className="w-30 h-20 "
                                                    src="../images/shoplogo.png"
                                                    alt=""
                                                />
                                            </a>
                                        </div>
                                        <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                                            <a
                                                href="/adminhome"
                                                title=""
                                                className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                            >
                                                Home
                                            </a>
                                            <a
                                                href="/adminallorders"
                                                title=""
                                                className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                            >
                                                Orders
                                            </a>

                                            <a
                                                href="register"
                                                title=""
                                                className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white"
                                                role="button"
                                            >
                                                Log out
                                            </a>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            className="inline-flex p-1 text-black transition-all duration-200 border border-black lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                                        >
                                            {/* Menu open: "hidden", Menu closed: "block" */}
                                            <svg
                                                className={`${menuVisible ? 'hidden' : 'block'} w-6 h-6`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                            </svg>
                                            {/* Menu open: "block", Menu closed: "hidden" */}
                                            <svg
                                                className={`${menuVisible ? 'block' : 'hidden'} w-6 h-6`}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </header>
                            <div className={`${menuVisible ? 'block' : 'hidden'} px-4 py-2 lg:hidden`} id="menuItems">
                                <a
                                    href="/adminhome"
                                    title=""
                                    className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                >
                                    Home
                                </a>

                                <a

                                    title=""
                                    className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                >
                                    Log out
                                </a>
                            </div>
                        </div> :
                            <>
                                <div className="fixed top-0 left-0 right-0 bg-white z-10 sm:mx-5 md:mx-14">
                                    <header className="">
                                        <div className="px-4 mx-auto sm:px-6 lg:px-8">
                                            <div className="flex items-center justify-between h-16 lg:h-20">
                                                <button
                                                    type="button"
                                                    onClick={toggleMenu}
                                                    className="inline-flex p-1 text-black transition-all duration-200  hover:bg-gray-100"
                                                >
                                                    {/* Menu open: "hidden", Menu closed: "block" */}
                                                    <svg
                                                        className={`${menuVisible ? 'hidden' : 'block'} w-6 h-6`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 6h16M4 12h16M4 18h16"
                                                        />
                                                    </svg>
                                                    <h2 className='px-3'>Menu</h2>
                                                    {/* Menu open: "block", Menu closed: "hidden" */}
                                                    <svg
                                                        className={`${menuVisible ? 'block' : 'hidden'} w-6 h-6`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                                <a href='/'>
                                                    <h3 className='py-1 text-center  font-bold text-2xl rounded-lg'>SHOPIFY</h3>
                                                </a>

                                                <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">

                                                    <div className="w-px h-5 bg-black/20"></div>
                                                    <a
                                                        onClick={() => { handleOpen() }}
                                                        title=""
                                                        className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                                    >
                                                        Log in
                                                    </a>
                                                    <a
                                                        href="/register"
                                                        title=""
                                                        className="inline-flex items-center justify-center px-5 py-2.5 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white"
                                                        role="button"
                                                    >
                                                        Sign up
                                                    </a>
                                                </div>
                                                {/* <button
                                                type="button"
                                                onClick={toggleMenu}
                                                className="inline-flex p-1 text-black transition-all duration-200 border border-black  focus:bg-gray-100 hover:bg-gray-100"
                                            >
                                               
                                                <svg
                                                    className={`${menuVisible ? 'hidden' : 'block'} w-6 h-6`}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 6h16M4 12h16M4 18h16"
                                                    />
                                                </svg>
                                                
                                                <svg
                                                    className={`${menuVisible ? 'block' : 'hidden'} w-6 h-6`}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button> */}
                                            </div>
                                        </div>
                                    </header>
                                    <div className={`${menuVisible ? 'block' : 'hidden'} px-4 py-2`} id="menuItems">
                                        <a
                                            href="/"
                                            title=""
                                            className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                        >
                                            Home
                                        </a>
                                        <a
                                            href="#"
                                            title=""
                                            className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                        >
                                            Products
                                        </a>
                                        <a
                                            href="#"
                                            title=""
                                            className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                        >
                                            Contact
                                        </a>
                                        <a
                                            href="#"
                                            title=""
                                            className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                        >
                                            Pricing
                                        </a>
                                        <div className="w-full h-px my-2 bg-black/20"></div>
                                        <a

                                            onClick={handleOpen}
                                            title=""
                                            className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                        >
                                            Log in
                                        </a>
                                        <a
                                            href="register"
                                            title=""
                                            className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                                        >
                                            Sign up
                                        </a>
                                    </div>
                                </div>

                                {/* modal part */}

                                <div className='container'>
                                    <div className='row'>
                                        <div>
                                            <Button onClick={handleOpen} ></Button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">

                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                                                        <section>
                                                            <div className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
                                                                <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                                                                    <div className="flex flex-col">
                                                                        <div>
                                                                            <h2 className="text-4xl text-black">Sign in</h2>
                                                                        </div>
                                                                    </div>
                                                                    <form>
                                                                        <input
                                                                            ref={inputref}
                                                                            required={true}
                                                                            type="hidden"
                                                                            name="_redirect"
                                                                        />
                                                                        <div className="mt-4 space-y-6">
                                                                            <div className="col-span-full">
                                                                                <label className="block mb-3 text-sm font-medium text-gray-600">
                                                                                    {" "}
                                                                                    Email{" "}
                                                                                </label>
                                                                                <input
                                                                                    name='email'
                                                                                    onChange={handleonchange}
                                                                                    type="email"
                                                                                    required={true}
                                                                                    placeholder="Email"
                                                                                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:gray-blue-500 sm:text-sm"
                                                                                />
                                                                            </div>
                                                                            <div className="col-span-full">
                                                                                <label className="block mb-3 text-sm font-medium text-gray-600">
                                                                                    {" "}
                                                                                    Password{" "}
                                                                                </label>
                                                                                <input
                                                                                    type="password"
                                                                                    name='password'
                                                                                    onChange={handleonchange}
                                                                                    placeholder="******"
                                                                                    className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                                                                />
                                                                            </div>
                                                                            <p className="mt-4 mb-0 leading-normal text-sm place-content-end">
                                                                                <a className="font-bold text-slate-700" href="/forgotpass">
                                                                                    Forgot password?
                                                                                </a>
                                                                            </p>

                                                                            <GoogleLogin
                                                                                className="block mb-3 text-sm font-medium text-gray-600 w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-lg"
                                                                                onSuccess={handleSuccess}
                                                                                onFailure={handleFailure}
                                                                            />

                                                                            {/* <div class="px-6 sm:px-0 max-w-sm">
                                                                                <button type="button" onClick={login} class="text-white w-full  bg-black  focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
                                                                                    <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
                                                                            </div> */}
                                                                            <div className="col-span-full">
                                                                                <button
                                                                                
                                                                                    onClick={handlelogin}
                                                                                    type="submit"
                                                                                    className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                                                                                >
                                                                                    {" "}
                                                                                    Login{" "}
                                                                                </button>
                                                                                <button
                                                                                    type="submit"
                                                                                    onClick={handleClose}
                                                                                    className="mt-2 items-center justify-center w-full px-6 py-2.5 text-center text-black duration-200 bg-white border-2 border-black rounded-full nline-flex "
                                                                                >
                                                                                    {" "}
                                                                                    Cancel{" "}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <p className="mt-4 mb-0 leading-normal text-sm">
                                                                            Don't have an account?{" "}
                                                                            <a className="font-bold text-slate-700" href="/register">
                                                                                Sign up
                                                                            </a>
                                                                        </p>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </section>

                                                    </Typography>
                                                </Box>
                                            </Modal>
                                        </div>


                                    </div>
                                </div>
                            </>}


                </>
            )}
        </>
    );

}

export default Navbar;

