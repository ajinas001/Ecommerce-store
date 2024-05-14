import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function Singleproduct() {

    const [product, setProduct] = useState(null)
    const userid = localStorage.getItem("id")

    const addtocart = (id) => {
        console.log(id);
        axios.post('http://localhost:4005/user/addtocart', { userid: userid, id: id })
            .then((res) => {
                console.log(res);
                toast.success("Added to cart");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to add to cart");
            });
    }
    

    useEffect(() => {

        axios.get('http://localhost:4005/user/viewofferproduct').then((res) => {
            console.log(res);
            setProduct(res.data.data)
        })
    }, [])

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
    
    
    
    return (
        <>
            {product && product.map((data, key) => (
                <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <a
                        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                        href={`/viewproductdetails/${data._id}`}
                    >
                        <img
                            className="object-cover"
                            src={`/uploadedimages/${data.images[0]}`}
                        />
                        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                            {data.Discount}% OFF
                        </span>
                    </a>
                    <div className="mt-4 px-5 pb-5">
                        <a href="#">
                            <h5 className="text-xl tracking-tight text-slate-900">
                                {data.Name}
                            </h5>
                        </a>
                        <div className="mt-2 mb-5 flex items-center justify-between">
                            <p>
                                <span className="text-2xl font-bold text-slate-900">INR {offerprice(data)}</span><br></br>
                                <span className="text-sm text-slate-900 line-through ">INR {data.Price}</span>
                            </p>
                            {/* <div className="flex items-center">
             <svg
                 aria-hidden="true"
                 className="h-5 w-5 text-yellow-300"
                 fill="currentColor"
                 viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg"
             >
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
             </svg>
             <svg
                 aria-hidden="true"
                 className="h-5 w-5 text-yellow-300"
                 fill="currentColor"
                 viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg"
             >
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
             </svg>
             <svg
                 aria-hidden="true"
                 className="h-5 w-5 text-yellow-300"
                 fill="currentColor"
                 viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg"
             >
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
             </svg>
             <svg
                 aria-hidden="true"
                 className="h-5 w-5 text-yellow-300"
                 fill="currentColor"
                 viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg"
             >
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
             </svg>
             <svg
                 aria-hidden="true"
                 className="h-5 w-5 text-yellow-300"
                 fill="currentColor"
                 viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg"
             >
                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
             </svg>
             <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                 5.0
             </span>
         </div> */}
                        </div>
                        <a
                        onClick={()=>{addtocart(data._id)}}
                            href="#"
                            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            Add to cart
                        </a>
                    </div>
                </div>
            ))}


        </>
    )
}

export default Singleproduct
