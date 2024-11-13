import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Singleproduct from "./Singleproduct";
import Homeproducts from "./Homeproducts";
import axios from "axios";
import AnimatedPage from "../../Pages/Animatedpage";
import Aos from 'aos';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import PromoSection from "./Promosection";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Userhome() {
  const [product, setProduct] = useState([]);
  const [decodeddata, setdecodeddata] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.post('http://localhost:4005/login/verify');
        console.log(res.data.data, "data decoded");
        setdecodeddata(res.data.data);
      } catch (err) {
        console.log(err);
   
        localStorage.clear()
        navigate('/');
        window.location.reload()
        toast.error("Authorization failed. Please login again.");
       
      }
    };

    verifyUser();
  }, [navigate]);

  useEffect(() => {
    axios.get('http://localhost:4005/user/viewproduct')
      .then((res) => {
        console.log(res);
        setProduct(res.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setProduct([]);
        setLoading(false);
      });
  }, []);

 

  const getRandomProducts = (num) => {
    if (product.length <= num) return product;
    const shuffled = [...product].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const getRandomImage = (images) => {
    if (images.length <= 1) return ''; 
    const randomIndex = Math.floor(Math.random() * (images.length - 1)) + 1;
    return images[randomIndex];
  };

  const randomProducts = product.length > 0 ? getRandomProducts(3) : [];
  console.log(product,"product");

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


      <Navbar />
      <AnimatedPage>
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
                  <div className=' w-full md:w-[55%] sm:px-3' data-aos="fade-down">
                    <h6 className='text-[#8B8E99] font-bold'>
                      UP TO 50%
                    </h6>
                    <h1 className='text-4xl sm:text-6xl font-bold mb-5 mt-5 flex-wrap'>
                      Urban <br></br>New Collection
                    </h1>
                    <p className='text-[#8B8E99] mb-8'>
                      Functional,fashionable,and now at up to 50% off!
                    </p>
                    <a
                      href="/productsection"
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
                  <div className='lg:w-[45%] sm:mt-4' data-aos='zoom-in'>
                    <img src={`/uploadedimages/${getRandomImage(prod.images)}`} alt={prod.Name} className='lg:w-[80%] bg-white rounded-xl' />
                  </div>
                </section>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


        {/* <section className='flex  bg-white py-20 px-20 justify-between items-center sm:m-5 md:mx-32 md:mt-20 flex-wrap border rounded-lg shadow-lg' >
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
            href="/viewproductdetails"
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
        <div className='lg:w-[45%] flex-wrap'>
          <img src='../images/heroimg1.png.png' alt='#' className='lg:w-full bg-white'></img>
        </div>
      </section> */}














        <PromoSection />

        <Homeproducts />

        {/* <Sampleproductgrid/> */}





        <section className='flex bg-white lg:mb-8 py-4 px-4 justify-between items-center sm:m-5 md:mx-32 md:mt-20 flex-wrap relative' data-aos='fade-down' >
          <div className=' w-full md:w-[55%] sm:px-3' data-aos='fade-right'>
            <div className="bg-white text-black p-8 rounded-lg">
              <h2 className="text-4xl font-bold rounded ">Monogram Cotton-Blend Jacket</h2>
              <p className="text-5xl font-bold mt-4">INR 49,990</p>
              <p className="mt-4 text-base">
                Add a touch of sophistication to your home with our handcrafted ceramic vase. Each piece is uniquely made, blending seamlessly into both modern and classic decors.
              </p>
              <div className="flex space-x-4 mt-8">
                <a
                  href="/cart"
                  className="group flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition"
                >
                  <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                    Add to cart
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H1M7 13l1.5 6h8.5m-10 0h9"
                    />
                  </svg>
                </a>

                <button
                  className="flex-none flex items-center justify-center w-16 h-14 rounded-md text-slate-300 border border-slate-200"
                  type="button"
                  aria-label="Like"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    />
                  </svg>
                </button>
              </div>

            </div>
          </div>
          <div className='lg:w-[45%]' data-aos='zoom-in'>
            <img src={'../images/ma22.jpg'} alt='#' className=' lg:w-[70%] bg-white rounded-xl sm:mx-20' />
          </div>
        </section>
        {/* 
        <div className="flex flex-wrap">
          <section className="">
            <div className="m-10 mx-4 max-w-screen-xl overflow-hidden rounded-xl border shadow-lg md:pl-8 md:mx-36" data-aos='fade-up'>
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
                    href="/productsection"
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
                    src="../images/model5.jpg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

</div> */}





        <section className="bg-white py-6 sm:py-8 lg:py-12 sm:mx-5">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            {/* Heading */}
            <div className="mx-auto max-w-md text-center">
              <h2 className=" text-2xl font-bold sm:text-3xl capitalize">
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

      </AnimatedPage>
    </>
  )
}

export default Userhome
