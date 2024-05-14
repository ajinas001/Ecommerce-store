import React, { useEffect, useState } from 'react'
import Singleproduct from './Singleproduct'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function Homeproducts() {

    const [product, setProduct] = useState(null)



    useEffect(() => {
        axios.get('http://localhost:4005/user/viewproduct').then((res) => {
            console.log(res);
            setProduct(res.data.data)
        })
    }, [])

    return (
        <>
            {/* <section id='1'>
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="sr-only">Products</h2>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            <a href="#" className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"
                                        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">Earthen Bottle</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">$48</p>
                            </a>
                            <a href="#" className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg"
                                        alt="Olive drab green insulated bottle with flared screw lid and flat top."
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">Nomad Tumbler</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">$35</p>
                            </a>
                            <a href="#" className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg"
                                        alt="Person using a pen to cross a task off a productivity paper card."
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">Focus Paper Refill</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">$89</p>
                            </a>
                            <a href="#" className="group">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg"
                                        alt="Hand holding black machined steel mechanical pencil with brass tip and top."
                                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">
                                    Machined Mechanical Pencil
                                </h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">$35</p>
                            </a>
                            
                        </div>
                    </div>
                </div>

            </section> */}




            <section id="2">
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Customers also purchased
                        </h2>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                            {product && product.map((data, key) => (
                                <div key={key} className="group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={`/uploadedimages/${data.images[0]}`}
                                            alt="Front of men's Basic Tee in black."
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                        <a href="/wishlist" title="">
                                            <button className="mr-3 absolute top-0 right-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                                </svg>
                                            </button>
                                        </a>


                                        {/* <a
                                            href="/wishlist"
                                            title=""
                                            className="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80 m-1  px-4"
                                            role="button"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>

                                        </a> */}
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href={`/viewproductdetails/${data._id}`}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {data.Name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{data.Category}</p>
                                        </div>
                                        <div className="flex items-center">

                                            <p className="text-sm font-medium text-gray-900">{data.Price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>








            {/* <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-md text-center">
                        <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                            Our Offer featured Products
                        </h2>
                        <p className="mt-4 text-base text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus
                            massa dignissim tempus.
                        </p>
                    </div>
                    <div className="mt-0 grid grid-cols-2 gap-4 lg:mt-0 lg:grid-cols-4 lg:gap-4">
                        <article className="relative">

                            <Singleproduct />
                        </article>
                        <article className="relative">

                            <Singleproduct />
                        </article>
                        <article className="relative">

                            <Singleproduct />
                        </article>
                        <article className="relative">

                            <Singleproduct />
                        </article>


                    </div>
                </div>
            </section> */}









        </>
    );
}

export default Homeproducts;
