import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Profilesidebar from './Profilesidebar';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
import { useNavigate } from 'react-router-dom';

function CouponCard({ code, discount, description, validUntil }) {
    const handleCopyClick = () => {
        navigator.clipboard.writeText(code).then(() => {
            alert('Coupon code copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="container bg-gradient-to-r from-gray-700 to-gray-500 text-white p-8 rounded-lg shadow-lg">
            <div className="text-3xl font-bold mb-4">Special Offer!</div>
            <div className="text-lg mb-4">Get <span className="text-yellow-400 font-bold">{discount}</span> your next purchase!</div>
            <div className="text-base mb-4">{description}</div>
            <div className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
                <span className="text-2xl font-semibold">{code}</span>
                <button
                    className="bg-black text-white px-3 py-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleCopyClick}
                >
                    Copy
                </button>
            </div>
            <div className="text-sm mt-4">
                <p>Valid until <span className="font-semibold">{validUntil}</span></p>
                <p>Terms and conditions apply.</p>
            </div>
        </div>
    );
}

function Rewards() {
    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    const navigate = useNavigate();

    const coupons = [
        { code: 'TAILOFFER25', discount: 'INR 1000 OFF', description: 'Use coupon code:', validUntil: 'December 31, 2023' },
        { code: 'SUMMER2024', discount: '15% OFF', description: 'Summer Sale!', validUntil: 'July 31, 2024' },
        { code: 'WELCOME10', discount: '10% OFF', description: 'Welcome Offer!', validUntil: 'August 15, 2024' }
    ];

    return (
        <>
            <Navbar />
            <div className="font-sans bg-white md:px-24 px-8 py-8">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Sidebar */}
                    <Profilesidebar />

                    {/* Main content */}
                    <div className="flex-1 flex-wrap max-w-7xl mx-auto w-full rounded-md p-4">
                        <div className="grid lg:grid-cols-2 gap-4 mt-12" data-aos="fade-left">
                            {coupons.map((coupon, index) => (
                                <CouponCard
                                    key={index}
                                    code={coupon.code}
                                    discount={coupon.discount}
                                    description={coupon.description}
                                    validUntil={coupon.validUntil}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Rewards;
