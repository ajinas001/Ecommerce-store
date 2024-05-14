import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';


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

function Navbar() {
    const [menuVisible, setMenuVisible] = useState(false);
    const [open, setOpen] = React.useState(false);

    const inputref = useRef(null);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            // Focus on input field when modal is opened
            inputref.current && inputref.current.focus();
        }
    }, [open]);


    const [data, setdata] = useState({
        email: "",
        password: ""
    })
    const [gdata, setgdata] = useState()
    const navigate = useNavigate()

    const handleonchange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        setdata({ ...data, [name]: value })
    }

    const handlelogin = (event) => {
        event.preventDefault()
        axios.post('http://localhost:4005/login/login', data).then((res) => {
            console.log(res);
            toast.success(res.data.message)
            handleClose()
            localStorage.setItem("role", res.data.data.role)
            localStorage.setItem("id", res.data.data._id)

            if (res.data.data.role == "1") {
                window.location.reload()
                navigate('/userhome')
            }
            else {
                navigate("/adminhome")
            }





        })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message)
            })
    }

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`,
                    },
                });
                setgdata(res.data); // Update gdata
                console.log(res);
                // Check if res.data has the required data
                if (res.data) {
                    axios.post("http://localhost:4005/login/glogin", res.data).then((res) => {
                        console.log(res, "response");
                        handleClose()
                        localStorage.setItem("role", res.data.data.role)
                        localStorage.setItem("id", res.data.data._id)
                        navigate("/userhome");
                        window.location.reload()
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
    });


    const handlelogout = () => {
        localStorage.clear()
        navigate('/')
        window.location.reload()
    }



    return (
        <>
            {role == 1 ?
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
        <span class="absolute top-0 right-3 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">5</span>
    </div>

    <div class="relative flex items-center hidden sm:flex ">
        <a href="/wishlist" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1 px-4 lg:px-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
           
        </a>
        <span class="absolute top-0 right-3 bg-black text-white p-2 rounded-full w-4 h-4 flex items-center justify-center text-xs">5</span>
    </div>

    <a
        title=""
        onClick={handlelogout}
        className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1 px-4 lg:px-4 flex items-center"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        
    </a>
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
                    <div className={`${menuVisible ? 'block' : 'hidden'} px-4 py-2 `} id="menuItems">
                        <a
                            href="/userhome"
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
                            Men
                        </a>
                        <a
                            href="#"
                            title=""
                            className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            women
                        </a>
                        <a
                            href="#"
                            title=""
                            className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            Men's shoes
                        </a>
                        <a
                            href="#"
                            title=""
                            className="block py-2 text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
                        >
                            Women's shoes
                        </a>
                        <a
                            href="#"
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
                        <span class="absolute top-0 left-5 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">5</span>
                        </div>
                        <div class="relative">
                            <a href="/wishlist" title="" className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1" role="button">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </a>
                            <span class="absolute top-0 left-5 bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">5</span>
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
                : role == 0 ? <div className="fixed top-0 left-0 right-0 bg-white z-10 sm:mx-5 md:mx-14">
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

                                        <h3 className=' py-1 text-center font-serif text-2xl'>SHOPIFY</h3>


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
                                                href="register"
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

                                                                    {/* <GoogleLogin
                                                                        className="block mb-3 text-sm font-medium text-gray-600"
                                                                        onSuccess={credentialResponse => {
                                                                            console.log(credentialResponse);
                                                                            toast.success("Google login success")
                                                                        }}
                                                                        onError={() => {
                                                                            console.log('Login Failed');
                                                                            toast.error("Google login failed")
                                                                        }}
                                                                    /> */}


                                                                    <div class="px-6 sm:px-0 max-w-sm">
                                                                        <button type="button" onClick={login} class="text-white w-full  bg-black  focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
                                                                    </div>
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
    );
}

export default Navbar;

