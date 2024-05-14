import React, { useState } from 'react';

function SampleHome() {
    // const [menuVisible, setMenuVisible] = useState(false);

    // const toggleMenu = () => {
    //     setMenuVisible(!menuVisible);
    // };

    return (



        <>


            <section className='flex  bg-white m-10 py-10 px-10 justify-between items-center sm:m-5 md:mx-36 flex-wrap border rounded-lg'>
                <div className=' w-full md:w-[55%]'>
                    <h6 className='text-[#8B8E99] font-bold'>
                        UP TO 50%
                    </h6>
                    <h1 className='text-6xl font-bold mb-5 mt-5'>
                        Urban <br></br>New Collection
                    </h1>
                    <p className='text-[#8B8E99] mb-8'>
                        Functional,fashionable,and now at up to 50% off!
                    </p>
                    <a
                        href="#"
                        className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
                    >
                        <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                            {" "}
                            Explore now{" "}
                        </span>
                        <svg
                            className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </a>
                </div>
                <div className='md:w-[45%] flex-wrap'>
                    <img src='../images/heroimg1.png.png' alt='#' className='md:w-full bg-white'></img>
                </div>
            </section>



            {/* <div className="bg-gradient-to-b from-white-50 to-white-100">
                <>
                    <div className="">
                        <div className="bg-gradient-to-b from-white-50 to-white-100">
                            <div className="">
                                <header className="">
                                    <div className="px-4 mx-auto sm:px-6 lg:px-8">
                                        <div className="flex items-center justify-between h-16 lg:h-20">
                                            <div className="flex-shrink-0">
                                                <a href="#" title="" className="flex">
                                                    <img
                                                        className="w-auto h-8"
                                                        src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/logo.svg"
                                                        alt=""
                                                    />
                                                </a>
                                            </div>
                                            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                                                <a
                                                    href="#"
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
                                                    Pricing
                                                </a>
                                                <div className="w-px h-5 bg-black/20"></div>
                                                <a
                                                    href="/login"
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
                                                    Register
                                                </a>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={toggleMenu}
                                                className="inline-flex p-1 text-black transition-all duration-200 border border-black lg:hidden focus:bg-gray-100 hover:bg-gray-100"
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
                                            </button>
                                        </div>
                                    </div>
                                </header>
                                <div className={`${menuVisible ? 'block' : 'hidden'} px-4 py-2 lg:hidden`} id="menuItems">
                                    <a
                                        href="#"
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
                                        href="/login"
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
                                        Register
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                <section className="py-10 sm:py-16 lg:py-5">
                    <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
                        <div className="">
                            <div className="relative overflow-hidden bg-white">
                                <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                                        <div className="sm:max-w-lg">
                                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                                Summer styles are finally here
                                            </h1>
                                            <p className="mt-4 text-xl text-gray-500">
                                                This year, our new summer collection will shelter you from the harsh elements of a world that
                                                doesn't care if you live or die.
                                            </p>
                                        </div>
                                        <div>
                                            <div className="mt-10">
                                               
                                                <div
                                                    aria-hidden="true"
                                                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                                                >
                                                    <div className="absolute transform sm:left-1/2 sm:top-0 sm
                          :translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                                        <div className="flex items-center space-x-6 lg:space-x-8">
                                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                                <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                                    <img
                                                                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                                                                        alt=""
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>
                                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                                    <img
                                                                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                                                                        alt=""
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                                    <img
                                                                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                                                                        alt=""
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>
                                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                                    <img
                                                                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                                                                        alt=""
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>
                                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                                    <img
                                                                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                                                                        alt=""
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                                    <img
                                                                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                                                                        alt=""
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>
                                                                <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                                    <img
                                                                        src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                                                                        alt=""
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <a
                                                    href="#"
                                                    className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                                                >
                                                    Shop Collection
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div> */}
        </>
    );
}

export default SampleHome;
