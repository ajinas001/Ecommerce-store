// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Payment = () => {
//   const [info, setInfo] = useState({ Email: "", Phone: "" });
//   const [couponCode, setCouponCode] = useState("");
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(100.0); // Example total amount
//   const [shippingCost, setShippingCost] = useState(10.0); // Example shipping cost

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setInfo({ ...info, [name]: value });
//   };

//   const applyCoupon = () => {
//     if (couponCode === "DISCOUNT10") {
//       setCouponDiscount(10);
//     } else {
//       setCouponDiscount(0);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="md:w-2/3 w-full bg-white p-6 rounded-md shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Checkout</h2>
//           <form>
//             <div>
//               <h3 className="text-base font-semibold text-gray-800 mb-4">
//                 Contact Information
//               </h3>
//               <div className="relative flex items-center mb-4">
//                 <input
//                   type="email"
//                   name="Email"
//                   value={info.Email}
//                   onChange={handleOnChange}
//                   placeholder="Email"
//                   className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="#bbb"
//                   stroke="#bbb"
//                   className="w-5 h-5 absolute right-4"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6h16v2l-8 5-8-5V6zm16 12H4V9.167l7.529 4.706a.996.996 0 0 0 1.026 0L20 9.167V18z"></path>
//                 </svg>
//               </div>
//               <div className="relative flex items-center mb-4">
//                 <input
//                   type="text"
//                   name="Phone"
//                   value={info.Phone}
//                   onChange={handleOnChange}
//                   placeholder="Phone"
//                   className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="#bbb"
//                   stroke="#bbb"
//                   className="w-5 h-5 absolute right-4"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M18.25 12.338c-.86 0-1.697-.138-2.493-.405-.393-.135-.84-.034-1.14.268l-2.193 2.208a16.093 16.093 0 0 1-6.588-6.588l2.208-2.208c.301-.301.402-.748.268-1.14a8.26 8.26 0 0 1-.405-2.493A1.25 1.25 0 0 0 7.25 1H4.25c-.647 0-1.18.492-1.245 1.136C2.462 7.82 6.18 15.397 11.818 20.536 16.135 23.82 18.957 24 19.75 24h3c.647 0 1.18-.492 1.245-1.136.071-2.874-.642-5.68-2.045-8.084a1.25 1.25 0 0 0-1.117-.678z"></path>
//                 </svg>
//               </div>
//             </div>

//             <div className="mt-8">
//               <h3 className="text-base font-semibold text-gray-800 mb-4">
//                 Apply Coupon
//               </h3>
//               <div className="relative flex items-center">
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   placeholder="Enter coupon code"
//                   className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
//                 />
//                 <button
//                   type="button"
//                   onClick={applyCoupon}
//                   className="absolute right-0 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-black"
//                 >
//                   Apply
//                 </button>
//               </div>
//               {couponDiscount > 0 && (
//                 <div className="mt-4 text-sm text-green-600">
//                   Coupon applied! You saved ${couponDiscount}.
//                 </div>
//               )}
//             </div>

//             <div className="mt-8">
//               <h3 className="text-base font-semibold text-gray-800 mb-4">
//                 Payment Details
//               </h3>
//               <div className="relative flex items-center mb-4">
//                 <input
//                   type="text"
//                   placeholder="Card Number"
//                   className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="#bbb"
//                   stroke="#bbb"
//                   className="w-5 h-5 absolute right-4"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6h16v2H4V6zm0 12v-8h16l.002 8H4z"></path>
//                   <path d="M6 14h6v2H6z"></path>
//                 </svg>
//               </div>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="relative flex items-center mb-4">
//                   <input
//                     type="text"
//                     placeholder="Expiry Date"
//                     className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
//                   />
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="#bbb"
//                     stroke="#bbb"
//                     className="w-5 h-5 absolute right-4"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6h16v2H4V6zm0 12v-8h16l.002 8H4z"></path>
//                   </svg>
//                 </div>
//                 <div className="relative flex items-center mb-4">
//                   <input
//                     type="text"
//                     placeholder="CVC"
//                     className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
//                   />
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="#bbb"
//                     stroke="#bbb"
//                     className="w-5 h-5 absolute right-4"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6h16v2H4V6zm0 12v-8h16l.002 8H4z"></path>
//                   </svg>
//                 </div>
//               </div>
//               <div className="relative flex items-center mb-4">
//                 <select className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none">
//                   <option value="" disabled selected>
//                     Choose Payment Method
//                   </option>
//                   <option value="credit-card">Credit Card</option>
//                   <option value="paypal">PayPal</option>
//                   <option value="apple-pay">Apple Pay</option>
//                 </select>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="#bbb"
//                   stroke="#bbb"
//                   className="w-5 h-5 absolute right-4 pointer-events-none"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M7 10l5 5 5-5z"></path>
//                 </svg>
//               </div>
//             </div>

//             <div className="mt-8">
//               <button
//                 type="submit"
//                 className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-black"
//               >
//                 Place Order
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className="bg-gray-100 p-6 rounded-md md:w-1/3 w-full">
//           <h3 className="text-base font-semibold text-gray-800 mb-4">
//             Order Summary
//           </h3>
//           <div className="text-sm text-gray-600">
//             <div className="flex justify-between items-center py-2 border-b">
//               <span>Subtotal</span>
//               <span>${totalAmount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center py-2 border-b">
//               <span>Shipping</span>
//               <span>${shippingCost.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center py-2 border-b">
//               <span>Discount</span>
//               <span>${couponDiscount.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between items-center py-2 font-semibold">
//               <span>Total</span>
//               <span>
//                 ${(totalAmount - couponDiscount + shippingCost).toFixed(2)}
//               </span>
//             </div>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-base font-semibold text-gray-800 mb-4">
//               Order Items
//             </h3>
//             <div className="flex justify-between items-center py-2">
//               <img
//                 src="https://via.placeholder.com/50"
//                 alt="Item"
//                 className="w-12 h-12 rounded-md"
//               />
//               <div className="ml-2">
//                 <p className="text-sm font-semibold text-gray-800">
//                   Item Name
//                 </p>
//                 <p className="text-sm text-gray-600">Quantity: 1</p>
//               </div>
//               <span className="ml-auto font-semibold">$50.00</span>
//             </div>
//             <div className="flex justify-between items-center py-2">
//               <img
//                 src="https://via.placeholder.com/50"
//                 alt="Item"
//                 className="w-12 h-12 rounded-md"
//               />
//               <div className="ml-2">
//                 <p className="text-sm font-semibold text-gray-800">
//                   Item Name
//                 </p>
//                 <p className="text-sm text-gray-600">Quantity: 1</p>
//               </div>
//               <span className="ml-auto font-semibold">$50.00</span>
//             </div>
//             <Link
//               to="/cart"
//               className="text-sm text-gray-800 hover:text-black mt-4 inline-block"
//             >
//               Edit Cart
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;
