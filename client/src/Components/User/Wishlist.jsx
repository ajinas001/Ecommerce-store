import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import Aos from 'aos';
import {  fetchwishlist, removeFrowishlist } from '../../Redux/WishSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Wishlist() {
  const [data, setData] = useState([]);
  const userid = localStorage.getItem('id');
  console.log(data);
  const dispatch = useDispatch()

  const fetchWishlist = () => {
    axios
      .post('http://localhost:4005/user/viewwishlist', { userid: userid })
      .then((res) => {
        console.log(res);
        if (res.data.data !== null && Array.isArray(res.data.data) && res.data.data.length === 0) {
          setData([]); // Set data to an empty array
       
        } else {

          setData(res.data.data);
        }
      });
  };

  useEffect(() => {
    console.log(userid);
    fetchWishlist();
  
    // dispatch(fetchwishlist(userid))
  },[]);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFrowishlist({ userid, productId }))

        .then(() => {
          setData(data.filter((item)=>item._id!==productId));
            toast.success('Removed from wishlist');
           
        })
        .catch((error) => {
            console.error('Failed to remove from wishlist:', error);
            toast.error('Failed to remove from wishlist');
        });
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
}

const calculateTotal = () => {
  return data.reduce((total, item) => {
    // const itemQuantity = quantities[item._id] || item.quantity; // Use default quantity if not in state
    return total + (offerprice(item) );
  }, 0);
};

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <>
      <Navbar />

      <section className="h-screen bg-white py-12 sm:py-16 lg:py-10" data-aos="fade-up">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-lg md:mt-16">
            <div className="rounded-3xl bg-white shadow-lg">
              <div className="px-4 py-6 sm:px-8  sm:py-10">
                {data.length === 0 ? (
                  <div className="text-center mt-4">
                    <h2 className="text-2xl font-semibold text-gray-900">Your Wishlist is Empty</h2>
                    <p className="mt-4 text-sm text-gray-500">You have no items in your wishlist.</p>
                    <img
                      src="../images/wishlistEmpty.png" // Replace with a relevant image URL
                      alt="Empty Wishlist"
                      className="mx-auto mt-6 w-1/2"
                    />
                    <a
                                                href="/userhome"
                                                title=""
                                                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl m-4 text-base font-semibold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 focus:bg-black focus:text-white"
                                                role="button"
                                            >
                                                Return home
                                            </a>
                  </div>
                ) : (
                  <div className="flow-root">
                    <ul className="-my-8">
                      {data.map((item, key) => (
                        <li key={key} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                          <div className="shrink-0 relative">
                            {/* <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                              1
                            </span> */}
                             {item.Discount && item.Discount > 0 ? (
                                <span className="absolute top-0 left-0 m-2 flex h-auto w-auto items-center justify-center rounded-full bg-black px-2 text-center text-[8px] font-medium text-white">
                                  {item.Discount}% OFF
                                </span>
                              ) : null}
                            <img
                              onClick={() => { window.location.href = `/viewproductdetails/${item._id}` }}
                              className="h-24 w-24 max-w-full rounded-lg object-cover"
                              src={`/uploadedimages/${item.images[0]}`}
                            />
                          </div>
                          <div className="relative flex flex-1 flex-col justify-between">
                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                              <div className="pr-8 sm:pr-5">
                                <p className="text-base font-semibold text-gray-900">
                                  {item.Name}
                                </p>
                                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                  {item.Category}
                                </p>
                              </div>
                              <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                  INR {offerprice(item)}
                                </p>
                              </div>
                            </div>
                            <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                              <button
                                type="button"
                                onClick={() => handleRemoveFromWishlist(item._id)}
                                className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                              >
                                <svg
                                  className="h-5 w-5"
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
                                    className=""
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.length > 0 && (
                  <>
                    <div className="mt-6 space-y-3 border-t border-b py-8">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-400">Subtotal</p>
                        <p className="text-lg font-semibold text-gray-900">{calculateTotal()}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-400">Shipping</p>
                        <p className="text-lg font-semibold text-gray-900">0.00</p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Total</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        <span className="text-xs font-normal text-gray-400">INR</span>{" "}
                       {calculateTotal()}
                      </p>
                    </div>
                    <div className="mt-6 text-center">
                      <button
                        type="button"
                        className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                      >
                        Add to cart
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Wishlist;
