import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiUser, FiGift, FiCreditCard, FiShoppingBag, FiStar, FiMapPin, FiEye, FiHeart, FiMenu, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';

function Profilesidebar() {
    const userid = localStorage.getItem("id");

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);


    useEffect(() => {
        if (userid) {
            setLoading(true);
            axios.post('http://localhost:4005/user/viewuserdetails', { _id: userid })
                .then((res) => {
                    const userDetails = res.data.data[0];
                    setData({
                        Name: userDetails.name,
                        Lastname: userDetails.lastname || "",
                        Email: userDetails.email,
                        Phone: userDetails.phone
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching user details:', err);
                    setLoading(false);
                });
        } else {
            console.error('User ID is not set');
        }
    }, [userid]);

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const pic = localStorage.getItem("pic")

    return (
        <>
            <div
                className={`rounded-md sm:h-screen md:h-auto sm:sticky sm:top-0 lg:min-w-[350px] sm:min-w-[300px] transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                data-aos="fade-right"
            >
                <div className="relative h-full bg-white shadow-sm p-4 rounded-md pt-20 pb-8">
                    <div className="flex flex-col items-center justify-center">
                        {pic ? (
                            <img
                                src={pic}
                                className="w-20 h-20 rounded-full"
                                alt="Profile"
                            />
                        ) : (
                            <img
                                src="../images/profileimg.jpg"
                                className="w-20 h-20 rounded-full"
                                alt="Profile"
                            />
                        )}


                        <h3 className="text-base text-gray-800 mt-2">{data.Name}</h3>
                    </div>
                    <ul className="mt-6 space-y-2">
                        <Link to="/profile">
                            <li className="flex items-center p-2 text-gray-800 hover:bg-blue-100 rounded">
                                <FiUser className="mr-2 text-blue-500" /> Profile
                            </li>
                        </Link>
                        <Link to="/rewards">
                            <li className="flex items-center p-2 text-gray-800 hover:bg-green-100 rounded">
                                <FiGift className="mr-2 text-green-500" /> <a href="#">Rewards</a>
                            </li>
                        </Link>
                        <Link to={'/wallet'}>
                            <li className="flex items-center p-2 text-gray-800 hover:bg-red-100 rounded">
                                <FiCreditCard className="mr-2 text-red-500" /> <a href="#">Wallet</a>
                            </li>
                        </Link>
                        <Link to="/myorders">
                            <li className="flex items-center p-2 text-gray-800 hover:bg-yellow-100 rounded">
                                <FiShoppingBag className="mr-2 text-yellow-500" /> My orders
                            </li>
                        </Link>
                        <li className="flex items-center p-2 text-gray-800 hover:bg-purple-100 rounded">
                            <FiStar className="mr-2 text-purple-500" /> <a href="#">Reviews</a>
                        </li>
                        <Link to='/deliveryaddressess'>
                        <li className="flex items-center p-2 text-gray-800 hover:bg-pink-100 rounded">
                            <FiMapPin className="mr-2 text-pink-500" /> <a href="#">Delivery addresses</a>
                        </li>
                        </Link>
                        <li className="flex items-center p-2 text-gray-800 hover:bg-indigo-100 rounded">
                            <FiEye className="mr-2 text-indigo-500" /> <a href="#">Recently viewed</a>
                        </li>
                        <Link to={'/profilefavourites'}>
                        <li className="flex items-center p-2 text-gray-800 hover:bg-teal-100 rounded">
                            <FiHeart className="mr-2 text-teal-500" /> <a href="#">Favourite items</a>
                        </li>
                        </Link>
                        <li className="flex items-center p-2 text-gray-800 hover:bg-red-100 rounded">
                            <FiLogOut className="mr-2 text-red-500" /> <a href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Toggle button for sidebar on mobile */}
            {/* <button
                className="sm:hidden fixed mt-8 left-4 bg-gray-800 text-white p-2 rounded-full shadow-md z-50"
                onClick={toggleSidebar}
            >
                <FiMenu className="w-6 h-6" />
            </button> */}
        </>
    );
}

export default Profilesidebar;
