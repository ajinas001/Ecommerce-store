import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import Profilesidebar from './Profilesidebar';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';

function Profile() {
    const userid = localStorage.getItem("id");

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        Name: "",
        Lastname: "",
        Email: "",
        Phone: "",
    });
    const [isSidebarOpen, setSidebarOpen] = useState(false);

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
                        SecondaryPhone: userDetails.SecondaryPhone || "", // Assuming you might have a lastname field
                        Email: userDetails.email,
                        Phone: userDetails.Phone,
                        SecondaryPhone: userDetails.SecondaryPhone,
                        Address: userDetails.UserAddress.Address,
                        City: userDetails.UserAddress.City,
                        State: userDetails.UserAddress.State,
                        PinCode: userDetails.UserAddress.PinCode,
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

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

   

    return (
        <>
            <Navbar />
            <div className="font-sans bg-white md:px-24 px-8 py-8">
                <div className="flex max-sm:flex-col gap-4 h-auto">
                    {/* Sidebar */}
                  <Profilesidebar/>

                    {/* Main content */}
                    <div className="max-w-4xl mx-auto w-full h-max rounded-md p-4 sticky top-0 mt-24" data-aos="fade-left">
                        <h2 className="text-xl font-bold text-gray-800 text-center">Complete your profile</h2>
                        <form className="mt-8">
                            <div>
                                <h3 className="text-base font-semibold text-gray-800 mb-4">
                                    Personal Details
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            name="Name"
                                            value={data.Name}
                                            onChange={handleOnChange}
                                            placeholder="First Name"
                                            className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#bbb"
                                            stroke="#bbb"
                                            className="w-[18px] h-[18px] absolute right-4"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx={10} cy={7} r={6} data-original="#000000" />
                                            <path
                                                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </div>
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            name='Phone'
                                            value={data.Phone}
                                            placeholder="Phone"
                                            className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#bbb"
                                            stroke="#bbb"
                                            className="w-[18px] h-[18px] absolute right-4"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx={10} cy={7} r={6} data-original="#000000" />
                                            <path
                                                d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </div>
                                    <div className="relative flex items-center">
                                        <input
                                            type="email"
                                            name='Email'
                                            value={data.Email}
                                            onChange={handleOnChange}
                                            placeholder="Email"
                                            className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#bbb"
                                            stroke="#bbb"
                                            className="w-[18px] h-[18px] absolute right-4"
                                            viewBox="0 0 682.667 682.667"
                                        >
                                            <defs>
                                                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                    <path d="M0 512h512V0H0Z" data-original="#000000" />
                                                </clipPath>
                                            </defs>
                                            <g
                                                clipPath="url(#a)"
                                                transform="matrix(1.33 0 0 -1.33 0 682.667)"
                                            >
                                                <path
                                                    fill="none"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={40}
                                                    d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                    data-original="#000000"
                                                />
                                                <path
                                                    d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                    data-original="#000000"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="relative flex items-center">
                                        <input
                                            type="number"
                                            name='SeconadryPhone'
                                            value={data.SecondaryPhone}
                                            placeholder="SecondaryPhone"
                                            className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                        />
                                        <svg
                                            fill="#bbb"
                                            className="w-[18px] h-[18px] absolute right-4"
                                            viewBox="0 0 64 64"
                                        >
                                            <path
                                                d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8">
                                {/* <h3 className="text-base font-semibold text-gray-800 mb-4">
                                    Shipping Address
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name='Address'
                                        placeholder="Address Line"
                                        value={data.Address}
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                    <input
                                        type="text"
                                        name='City'
                                        value={data.City}
                                        placeholder="City"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                    <input
                                        type="text"
                                        name='State'
                                        value={data.State}
                                        placeholder="State"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                    <input
                                        type="text"
                                        name='PinCode'
                                        value={data.PinCode}
                                        placeholder="Zip Code"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                </div> */}
                                <div className="flex gap-4 max-md:flex-col mt-8">
                                    <button
                                        type="button"
                                        className="rounded-md px-4 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-gray-800 max-md:order-1"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-md px-4 py-3 w-full text-sm font-semibold bg-gray-800 text-white hover:bg-gray-900"
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
