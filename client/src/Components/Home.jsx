import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Homeproducts from "./User/Homeproducts";
import Footer from "./Footer";
import Singleproduct from "./User/Singleproduct";
import axios from "axios";
import Aos from 'aos'
import 'aos/dist/aos.css'; // Import CSS for AOS
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import PromoSection from "./User/Promosection";

function Home() {

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4005/user/viewproduct')
      .then((res) => {
        console.log(res);
        setProduct(res.data.data || []);  // Ensure the data is an array
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setProduct([]);  // Set to an empty array on error
        setLoading(false); // Set loading to false on error
      });
  }, []);

  console.log(product,"products");

  const getRandomProducts = (num) => {
    if (product.length <= num) return product;
    const shuffled = [...product].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const getRandomImage = (images) => {
    if (images.length <= 1) return ''; // Return empty string if only one image
    const randomIndex = Math.floor(Math.random() * (images.length - 1)) + 1; // Excluding the first image
    return images[randomIndex];
  };

  const randomProducts = product.length > 0 ? getRandomProducts(3) : []; // Ensure randomProducts is an array

  // Render loading indicator if data is being fetched
  if (loading) {
    return <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
      <span class='sr-only'>Loading...</span>
      <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
    </div>
  }

  return (
    <>
      <style>
        {`
          .swiper-pagination-bullet {
            width: 0.5rem;
            height: 0.5rem;
            background-color: #718096;
            opacity: 0.5;
            border-radius: 50%;
            margin: 0 0.5rem;
            margin-top:4rem;
          }
          .swiper-pagination-bullet-active {
            background-color: #000;
            opacity: 1;
          }
          .swiper-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20rem; /* Adjust as needed */
          }
          .swiper-container {
            position: relative;
          }
          .swiper-slide-container {
            display: flex;
            background-color: white;
            padding: 20px;
            justify-content: space-between;
            align-items: center;
            margin: 5px;
            margin-top: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            position: relative;
          }
        `}
      </style>
      <div>
        <Navbar />
        <div className="swiper-container">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
            className="mySwiper"
          >
            {randomProducts.map((prod, index) => (
              <SwiperSlide key={index}>
                <section className='flex bg-white lg:mb-8 py-20 px-20 justify-between items-center sm:m-5 md:mx-32 md:mt-20 flex-wrap border rounded-lg shadow-lg relative' data-aos='fade-down' >
                  <div className=' w-full md:w-[55%]'>
                    <h6 className='text-[#8B8E99] font-bold'>
                      UP TO 50%
                    </h6>
                    <h1 className='text-4xl sm:text-6xl font-bold mb-5 mt-5 flex-wrap'>
                      Urban <br />New Collection
                    </h1>

                    <p className='text-[#8B8E99] mb-8'>
                      Functional,fashionable,and now at up to 50% off!
                    </p>
                    <a
                      href="/register"
                      className="group mt-auto mb-8 flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
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
                  <div className='lg:w-[45%]'>
                    <img src={`/uploadedimages/${getRandomImage(prod.images)}`} alt={prod.Name} className='lg:w-[80%] bg-white rounded-xl' />
                  </div>
                </section>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


        {/* <section className='flex bg-stone-50 py-20 px-20 justify-between items-center sm:m-5 md:mx-32 md:mt-16 flex-wrap border rounded-lg shadow-lg max-h-lg lg-h-[500px]' data-aos = 'fade-down' >
        <div className=' w-full md:w-[55%]'> 
          <h6 className='text-[#8B8E99] font-bold'>
            UP TO 50%
          </h6>
          <h1 className='text-6xl font-bold mb-5 mt-5 flex-wrap'>
            Urban <br></br>New Collection
          </h1>
          <p className='text-[#8B8E99] mb-8'>
            Functional,fashionable,and now at up to 50% off!
          </p>
          <a
            href="/register"
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
        <div className='lg:w-[45%] max-h-[60%] flex-wrap'>
          <img src='../images/jacket 12.jpg' alt='#' className='lg:w-[80%] bg-white rounded-xl xm-py-8 sm-py-8'></img>
        </div>
      </section> */}






        {/* <OneTimeSale/> */}
        <PromoSection />









        <Homeproducts />



        {/* <div className="bg-gradient-to-b from-white-50 to-white-100 md:mx-24">
        <section className="py-10 sm:py-16 lg:py-15">
          <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-8">
            <div className="">

              <div className='container'>
                <div className="relative overflow-hidden bg-white">
                  <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                      <div className="sm:max-w-lg">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                          Summer styles are finally here
                        </h1>
                        <p className="mt-4 text-xl text-gray-500">
                          This year, our new summer collection will shelter you from the harsh
                          elements of a world that doesn't care if you live or die.
                        </p>
                      </div>
                      <div>
                        <div className="mt-10">

                          <div
                            aria-hidden="true"
                            className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                          >
                            <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
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
                            className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
                          >
                            <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                              {" "}
                              Explore {" "}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </section>
      </div> */}

        <div className="flex flex-wrap">
          <section className="">
            <div className="m-10 mx-4 max-w-screen-xl overflow-hidden rounded-xl border shadow-lg md:pl-8 md:mx-36" data-aos='fade-down'>
              <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-70">
                <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
                  <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">
                    Winter Collection
                  </h2>
                  <p className="mt-2 text-lg">By Luis Vuitton</p>
                  <p className="mt-4 mb-8 max-w-md text-gray-500">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam iusto,
                    cumque dolores sit odio ex.
                  </p>
                  <a
                    href="/register"
                    className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
                  >
                    <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                      {" "}
                      Shop now{" "}
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
                <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
                  <img
                    className="h-full w-full object-cover"
                    src="../images/model3.webp"
                  // src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                  // loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>



          {/* <section>
                    <div className="flex flex-wrap font-sans m-10 rounded-xl border shadow-lg">
                        <div className="flex-none w-full md:w-48 sm:w-1/2 relative"> 
                            <img
                                src="../images/homejacket1.png"
                                alt="#"
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <form className="flex-auto p-6">
                            <div className="flex flex-wrap">
                                <h1 className="flex-auto text-lg font-semibold text-slate-900">
                                    Utility Jacket
                                </h1>
                                <div className="text-lg font-semibold text-slate-500">$110.00</div>
                                <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                                    In stock
                                </div>
                            </div>
                            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
                                <div className="space-x-2 flex text-sm">
                                    <label>
                                        <input
                                            className="sr-only peer"
                                            name="size"
                                            type="radio"
                                            defaultValue="xs"
                                            defaultChecked=""
                                        />
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                            XS
                                        </div>
                                    </label>
                                    <label>
                                        <input
                                            className="sr-only peer"
                                            name="size"
                                            type="radio"
                                            defaultValue="s"
                                        />
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                            S
                                        </div>
                                    </label>
                                    <label>
                                        <input
                                            className="sr-only peer"
                                            name="size"
                                            type="radio"
                                            defaultValue="m"
                                        />
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                            M
                                        </div>
                                    </label>
                                    <label>
                                        <input
                                            className="sr-only peer"
                                            name="size"
                                            type="radio"
                                            defaultValue="l"
                                        />
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                            L
                                        </div>
                                    </label>
                                    <label>
                                        <input
                                            className="sr-only peer"
                                            name="size"
                                            type="radio"
                                            defaultValue="xl"
                                        />
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                                            XL
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="flex space-x-4 mb-6 text-sm font-medium">
                                <div className="flex-auto flex space-x-4">
                                    <button
                                        className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                                        type="submit"
                                    >
                                        Buy now
                                    </button>
                                    <button
                                        className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                                        type="button"
                                    >
                                        Add to bag
                                    </button>
                                </div>
                                <button
                                    className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
                                    type="button"
                                    aria-label="Like"
                                >
                                    <svg width={20} height={20} fill="currentColor" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-sm text-slate-700">
                                Free shipping on all continental US orders.
                            </p>
                        </form>
                    </div>

                </section> */}


        </div>

        <section className="bg-white py-6 sm:py-8 lg:py-12 sm:mx-5">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            {/* Heading */}
            <div className="mx-auto max-w-md text-center">
              <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                Our Offer featured Products
              </h2>
              <p className="mt-4 text-base text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus
                massa dignissim tempus.
              </p>
            </div>
            {/* /Heading */}
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-16 sm:mx-5">
              {/* Replace each article with SingleProduct component */}
              <Singleproduct />





            </div>
          </div>
        </section>;


        {/*extra*/}
        {/* <section>
        <section className="">
          <div className="mx-auto max-w-md sm:max-w-lg md:max-w-screen-xl">
            <div className="px-4 py-8 md:px-6 md:py-12 lg:px-20">
              <h1 className="text-center text-3xl font-semibold text-gray-800 lg:text-4xl">
                Our Best Selling Collection
              </h1>
              <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3 lg:gap-8">
                <article className="bg-slate-50 p-8">
                  <div className="">
                    <h2 className="text-xl text-gray-600">Mens' Scotch</h2>
                    <p className="mt-2 text-xl font-semibold text-gray-800" />
                  </div>
                  <div className="mt-8 flex items-center justify-center md:mt-24">
                  <img src="../images/homejacket1.png" alt="" />
                  </div>
                </article>
                <article className="bg-slate-50 p-8">
                  <div className="">
                    <h2 className="text-xl text-gray-600">Mens' Red</h2>
                    <p className="mt-2 text-xl font-semibold text-gray-800" />
                  </div>
                  <div className="mt-8 flex items-center justify-center md:mt-24">
                  <img src="../images/homejacket2.jpg" alt="" />
                  </div>
                </article>
                <article className="bg-slate-50 p-8">
                  <div className="">
                    <h2 className="text-xl text-gray-600">Mens' Punk</h2>
                    <p className="mt-2 text-xl font-semibold text-gray-800" />
                  </div>
                  <div className="mt-8 flex items-center justify-center md:mt-24">
                  <img src="../images/homejacket3.jpg" alt="" />
                  </div>
                </article>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-5 md:mt-6 md:grid-cols-2 md:gap-6 lg:mt-8 lg:gap-8">
                <article className="bg-slate-50 p-8">
                  <div>
                    <h2 className="text-xl text-gray-600">Mens' Black</h2>
                    <p className="mt-2 text-xl font-semibold text-gray-800" />
                  </div>
                  <div className="mt-28 flex items-center justify-center md:mt-3">
                  <img src="../images/homejacket4.png" alt="" />
                  </div>
                </article>
                <article className="bg-slate-50 p-8">
                  <div>
                    <h2 className="text-xl text-gray-600">Womens' Brown</h2>
                    <p className="mt-2 text-xl font-semibold text-gray-800" />
                  </div>
                  <div className="mt-28 flex items-center justify-center md:mt-1">
                    <img src="../images/homejacket5.png" alt="" />
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

      </section> */}

        <Footer />

      </div>
    </>
  )
}

export default Home
