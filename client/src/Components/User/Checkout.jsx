import { useState, useEffect } from 'react';
import React from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function Checkout() {
    const userid = localStorage.getItem("id");
    const [data, setData] = useState([]);
    const [details, setDetails] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [couponCode, setCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [size, setSize] = useState({});
    const [formFilled, setFormFilled] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newadd, setnewadd] = useState(false)

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [info, setInfo] = useState({
        Name: '',
        Email: '',
        Phone: '',
        SecondaryPhone: '',
        Address: '',
        City: '',
        State: '',
        PinCode: ''
    });

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    useEffect(() => {
        if (userid) {
            setLoading(true); // Set loading to true when starting data fetch
            axios.post('http://localhost:4005/user/viewuserdetails', { _id: userid })
                .then((res) => {
                    console.log("User Details Response:", res.data);
                    const userDetails = res.data.data[0];
                    console.log(userDetails);
                    // setInfo({
                    //     Name: userDetails.name || "",
                    //     SecondaryPhone: userDetails.SecondaryPhone || "",
                    //     Email: userDetails.email,
                    //     Phone: userDetails.Phone,
                    // });
                    setAddresses(userDetails.UserAddress || []);
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

    console.log(info);
    console.log(selectedAddress);

    const applyCoupon = () => {
        if (couponCode === "DISCOUNT100") {
            setCouponDiscount(100);
        } else {
            setCouponDiscount(0);
        }
    };
    const handleCouponCancel = () => {
        setCouponDiscount(0);
    };

    const calculateTotal = () => {
        return details.reduce((total, item) => {
            const itemQuantity = quantities[item._id] || item.quantity; // Use default quantity if not in state
            return total + (offerprice(item) * itemQuantity);
        }, 0);
    };

    const offerprice = (data) => {
        if (!data || !data.Price) {
            return 0; // or any default value you prefer
        }

        const Price = parseInt(data.Price);
        const Discount = parseInt(data.Discount || 0); // Default to 0 if Discount is not available or falsy

        if (isNaN(Price)) {
            return 0; // Return default value if Price is not a number
        }

        if (isNaN(Discount) || Discount === 0) {
            return Price; // No discount, return original price
        }

        const discountedPrice = Price - (Price * Discount / 100); // Calculate discounted price
        return discountedPrice; // Return the result as a string with 2 decimal places
    };

    const handleOnChange = (event) => {
        setInfo({ ...info, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const fetchCartData = () => {
        axios.post("http://localhost:4005/cart/viewcart", { userid: userid })
            .then((res) => {
                console.log("API Response: ", res.data);
                setDetails(res.data.data);
                setData(res.data.cart);

                const itemCounts = {};
                const itemSize = {};
                if (res.data.cart && res.data.cart.products) {
                    res.data.cart.products.forEach(product => {
                        itemCounts[product.productId] = product.quantity;
                        itemSize[product.productId] = product.size;
                    });
                }
                console.log("Quantities:", itemCounts); // Log quantities to check
                setQuantities(itemCounts);
                setSize(itemSize);
            })
            .catch((error) => {
                console.error("Error fetching cart data: ", error);
            });
    };

    const handleAddressSelection = (index) => {
        const selected = addresses[index];
        setSelectedAddress(index);
        setInfo({
            Name:selected?.Name,
            Email: selected?.Email,
            Phone: selected?.Phone,
            SecondaryPhone:selected?.SecondaryPhone,
            Address: selected?.Address,
            City: selected?.City,
            State: selected?.State,
            PinCode: selected?.PinCode
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedAddress === null) {
            toast.error("Please select an address");
            return;
        }
        setFormFilled(true);
    };

    const handleaddresssubmit = () => {
        console.log(info);

        axios.post('http://localhost:4005/user/saveaddress', { info, userId: userid }).then((res) => {
            console.log(res);
            window.location.reload()
        })
            .catch((err) => {
                console.log(err);
            })
    }

    const handlePlaceOrder = () => {
        const orderDetails = {
            userId: userid,
            products: details.map((item) => ({
                productId: item._id,
                name: item.Name,
                quantity: quantities[item._id] || item.quantity,
                size: size[item._id] || item.size,
                price: offerprice(item),
            })),
            totalPrice: calculateTotal() - couponDiscount,
            discount: couponDiscount,
            address: addresses[selectedAddress],
            info,
        };

        axios.post("http://localhost:4005/user/saveorder", orderDetails)
            .then((res) => {
                console.log("Order placed successfully:", res.data);
                navigate('/ordersuccessfull');
            })
            .catch((err) => {
                console.error("Error placing order:", err);
                toast.error("Failed to place order. Please try again.");
            });
    };

    console.log(addresses, "addr");

    return (
        <>
            <Navbar />
            <div className="font-sans bg-white mt-20 md:px-24 px-8 mb-8" data-aos="fade-down">
                <div className="flex max-sm:flex-col gap-4 h-auto">
                    <div className="rounded-md bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 sm:h-screen md:h-auto sm:sticky sm:top-0 lg:min-w-[350px] sm:min-w-[300px]">
                        <div className="relative h-full">
                            <div className="p-4 sm:overflow-auto mb-16 pb-28">
                                {details && details.map((item, key) => (
                                    <div key={key} className="space-y-4">
                                        <div className="flex items-start gap-4 py-2">
                                            <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-2 shrink-0">
                                                <img
                                                    src={`/uploadedimages/${item.images[0]}`}
                                                    className="w-full object-contain bg-white rounded-md"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <h3 className="text-base text-white truncate w-36">{item.Name}</h3>
                                                <ul className="text-xs text-gray-300 space-y-1 mt-2">
                                                    <li className="flex flex-wrap gap-4">
                                                        Size <span className="ml-auto">{size[item._id] || item.size}</span>
                                                    </li>
                                                    <li className="flex flex-wrap gap-4">
                                                        Quantity <span className="ml-auto">{quantities[item._id] || item.quantity}</span>
                                                    </li>
                                                    <li className="flex flex-wrap gap-4">
                                                        Price<span className="ml-auto">{(quantities[item._id] || item.quantity) * (item.Price)}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
                                <h4 className="flex flex-wrap gap-4 text-base text-gray-300">
                                    Subtotal <span className="ml-auto">{calculateTotal()}</span>
                                </h4>
                                <h4 className="flex flex-wrap gap-4 text-base text-gray-300">
                                    Shipping <span className="ml-auto">00</span>
                                </h4>
                                <h4 className="flex flex-wrap gap-4 text-base text-gray-300 border-b pb-4">
                                    Discount <span className="ml-auto">{couponDiscount}</span>
                                </h4>
                                <h4 className="flex flex-wrap gap-4 text-base text-white font-medium pt-4">
                                    Total <span className="ml-auto">INR {calculateTotal() - couponDiscount}</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-4xl mx-auto w-full h-max rounded-md p-4">
                        <form onSubmit={handleSubmit}>
                            {/* <h2 className="font-medium text-xl text-gray-800 mb-4">Customer Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="name" className="text-sm text-gray-500">Full Name</label>
                                    <input type="text" id="name" name="Name" value={info.Name} onChange={handleOnChange} className="block w-full px-4 py-2 border rounded-md" />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="email" className="text-sm text-gray-500">Email</label>
                                    <input type="email" id="email" name="Email" value={info.Email} onChange={handleOnChange} className="block w-full px-4 py-2 border rounded-md" />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="phone" className="text-sm text-gray-500">Phone Number</label>
                                    <input type="text" id="phone" name="Phone" value={info.Phone} onChange={handleOnChange} className="block w-full px-4 py-2 border rounded-md" />
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="secondaryPhone" className="text-sm text-gray-500">Secondary Phone</label>
                                    <input type="text" id="secondaryPhone" name="SecondaryPhone" value={info.SecondaryPhone} onChange={handleOnChange} className="block w-full px-4 py-2 border rounded-md" />
                                </div>
                            </div> */}

                            <h2 className="font-medium text-xl text-gray-800 mt-6 mb-4">Address Information</h2>
                            <div className="space-y-2">
                                {addresses.map((address, index) => (
                                    <div
                                        key={index}
                                        className="border rounded-md p-4 space-y-2 relative pl-8 hover:bg-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <label className="flex items-start">
                                            <input
                                                type="radio"
                                                name="address"
                                                onChange={() => handleAddressSelection(index)}
                                                checked={selectedAddress === index}
                                                className="form-radio absolute top-6 left-4 text-black focus:ring-black"
                                                style={{
                                                    accentColor: 'black' // This is the inline style for modern browsers to change the radio button color
                                                }}
                                            />
                                            <span className="ml-4 text-black">
                                                <strong>{address.Name}</strong>
                                                <br />
                                                {`${address.Email}, ${address.Phone}, ${address.PinCode}`}
                                                <br />
                                                {`${address.Address}, ${address.City}, ${address.State}, ${address.PinCode}`}
                                            </span>
                                        </label>
                                    </div>
                                ))}



                            </div>
                            {!newadd && addresses.length !== 0 ? (
                                <h3 className='text-center font-bold m-2' onClick={() => setnewadd
                                    (true)}>+ Add new address</h3>
                            ) : (
                                <div className="mt-8">
                                    <h3 className="text-base font-semibold text-gray-800 mb-4">Add Address</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                name="Name"
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
                                                aria-hidden="true"
                                            >
                                                <circle cx={10} cy={7} r={6} />
                                                <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                        <div className="relative flex items-center">
                                            <input
                                                type="number"
                                                name="Phone"
                                                onChange={handleOnChange}
                                                placeholder="Phone No."
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                            />
                                            <svg
                                                fill="#bbb"
                                                className="w-[18px] h-[18px] absolute right-4"
                                                viewBox="0 0 64 64"
                                                aria-hidden="true"
                                            >
                                                <path d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z" />
                                            </svg>
                                        </div>
                                        <div className="relative flex items-center">
                                            <input
                                                type="email"
                                                name='Email'
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
                                                aria-hidden="true"
                                            >
                                                <defs>
                                                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                                        <path d="M0 512h512V0H0Z" />
                                                    </clipPath>
                                                </defs>
                                                <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                                    <path
                                                        fill="none"
                                                        strokeMiterlimit={10}
                                                        strokeWidth={40}
                                                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                                    />
                                                    <path
                                                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                                    />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="relative flex items-center">
                                            <input
                                                type="number"
                                                name="SecondaryPhone"
                                                onChange={handleOnChange}
                                                placeholder="Secondary Phone No"
                                                className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                            />
                                            <svg
                                                fill="#bbb"
                                                className="w-[18px] h-[18px] absolute right-4"
                                                viewBox="0 0 64 64"
                                                aria-hidden="true"
                                            >
                                                <path d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name='Address'
                                            placeholder="Address Line"
                                            onChange={handleOnChange}
                                            className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                        />
                                        <input
                                            type="text"
                                            name='City'
                                            onChange={handleOnChange}
                                            placeholder="City"
                                            className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                        />
                                        <input
                                            type="text"
                                            name='State'
                                            onChange={handleOnChange}
                                            placeholder="State"
                                            className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                        />
                                        <input
                                            type="text"
                                            name='PinCode'
                                            onChange={handleOnChange}
                                            placeholder="Pin Code"
                                            className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-4 max-md:flex-col mt-8">
                                        <button
                                            type="button"
                                            onClick={() => setnewadd(false)}
                                            className="rounded-md px-4 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-gray-800 max-md:order-1"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleaddresssubmit}
                                            className="rounded-md px-4 py-3 w-full text-sm font-semibold bg-gray-800 text-white hover:bg-gray-900"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            )}

                            {(!formFilled && !newadd) && <button
                                type="submit"
                                className="mt-4 w-full py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
                            >
                                Proceed
                            </button>}

                        </form>

                        {formFilled && (


                            <div className="mt-6">
                                {/* <h2 className="font-medium text-xl text-gray-800 mb-4">Review Order</h2> */}
                                <div className="border p-4 rounded-md">
                                    <h3 className="text-gray-700 mb-2">Delivery Information</h3>
                                    <p><strong>Name:</strong> {addresses[selectedAddress].Name}</p>
                                    <p><strong>Email:</strong> {addresses[selectedAddress].Email}</p>
                                    <p><strong>Phone:</strong> {addresses[selectedAddress].Phone}</p>
                                    <p><strong>Secondary Phone:</strong> {addresses[selectedAddress].SecondaryPhone}</p>

                                    <h3 className="text-gray-700 mb-2 mt-4">Shipping Address</h3>
                                    {addresses[selectedAddress] && (
                                        <p>{`${addresses[selectedAddress].Address}, ${addresses[selectedAddress].City}, ${addresses[selectedAddress].State}, ${addresses[selectedAddress].PinCode}`}</p>
                                    )}

                                    {/* <button
                                        onClick={handlePlaceOrder}
                                        className="mt-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                    >
                                        Place Order
                                    </button> */}
                                </div>
                            </div>
                        )}

                        {formFilled && (<>

                            <div className="mt-8">
                                <h3 className="text-base font-semibold text-gray-800 mb-4">
                                    Apply Coupon
                                </h3>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter coupon code"
                                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                                    />
                                    {/* <button
        type="button"
        onClick={applyCoupon}
        className="absolute right-0 bg-gray-800 text-white py-2 px-8 rounded-md hover:bg-black"
    >
        Apply
    </button> */}
                                    {couponDiscount > 0 ? (
                                        <button
                                            type="button"
                                            className="absolute right-0 bg-white text-black py-2 px-8 rounded-md border border-black hover:bg-slate-100"
                                            onClick={handleCouponCancel}
                                        >
                                            CANCEL
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={applyCoupon}
                                            className="absolute right-0 bg-gray-800 text-white py-2 px-8 rounded-md hover:bg-black"
                                        >
                                            Apply
                                        </button>
                                    )}

                                </div>

                                {couponDiscount > 0 && (
                                    <div className="mt-4 text-sm text-green-600">
                                        Coupon applied! You saved INR{couponDiscount}.
                                    </div>
                                )}
                            </div>
                            <div className="mt-8">
                                <h3 className="text-base font-semibold text-gray-800 mb-4">Payment</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <button
                                        type="button"
                                        className="py-2.5 px-4 border border-gray-400 rounded-md flex items-center justify-center gap-2 w-full transition ease-in duration-200 transform hover:scale-105 shadow-md"
                                    >
                                        <img
                                            // src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Razorpay_Logo.svg"
                                            src='../images/rpay.png'
                                            alt="Razorpay"
                                            className="w-15 h-10"
                                        />
                                        <span className="text-sm text-gray-800">Razorpay</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="py-2.5 px-4 border border-gray-400 rounded-md flex items-center justify-center gap-2 w-full transition ease-in duration-200 transform hover:scale-105 shadow-md"
                                    >
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                                            alt="PayPal"
                                            className="w-10 h-6"
                                        />
                                        <span className="text-sm text-gray-800">PayPal</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="py-2.5 px-4 border border-gray-400 rounded-md flex items-center justify-center gap-2 w-full transition ease-in duration-200 transform hover:scale-105 shadow-md"
                                    >
                                        <img
                                            // src="https://upload.wikimedia.org/wikipedia/commons/1/13/Google_Pay_Logo.svg"
                                            src='../images/gpay.png'
                                            alt="GPay"
                                            className="w-8 h-8"
                                        />
                                        <span className="text-sm text-gray-800">GPay</span>
                                    </button>
                                </div>

                            </div>

                            <h3 className='mt-4 text-center'>or</h3>

                            <div className="flex gap-4 max-md:flex-col mt-4">
                                {/* <button
        type="button"
        className="rounded-md px-4 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-gray-800 max-md:order-1"
    >
        Cancel
    </button> */}
                                <button
                                    type="button"
                                    onClick={handlePlaceOrder}
                                   
                                    className="rounded-md px-4 py-4 w-full text-sm font-semibold bg-gray-800 text-white hover:bg-gray-900 transition ease-in duration-200 transform hover:scale-105"
                                >
                                    Cash on Delivery
                                </button>
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
