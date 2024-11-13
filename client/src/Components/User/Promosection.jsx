import React, { useEffect } from 'react';
import Aos from 'aos';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const PromoSection = () => {

    const role = localStorage.getItem("role")
    const navigate = useNavigate()
   
    useEffect(()=>{
        if(!role){
            navigate('/register')
            toast.error("Please login")
        }
    },[])

    useEffect(() => {
        Aos.init({ duration: 1500 });
    }, []);

    const promos = [
        {
            id: 1,
            href: "#link",
            name: "Men's Collection",
            category: "Men",
            subheading: "Special Collection",
            imageSrc: "../images/men.jpg",
            imageAlt: "description of the image"
        },
        {
            id: 2,
            href: "#link",
            name: "Women's Collection",
            category: "Women",
            subheading: "New Collection",
            imageSrc: "../images/la23.jpg",
            imageAlt: "description of the image"
        },
        {
            id: 3,
            href: "#link",
            name: "Womens's Shoes",
            category: "Women's Shoes",
            subheading: "Summer Sales",
            imageSrc: "../images/ow32.jpg",
            imageAlt: "description of the image"
        },
        {
            id: 4,
            href: "#link",
            name: "Bag Collection",
            category: "Bags",
            subheading: "Summer Sales",
            imageSrc: "../images/bagavif.jpg",
            imageAlt: "description of the image"
        },
        {
            id: 5,
            href: "#link",
            name: "Men's shoes",
            category: "Men's Shoes",
            subheading: "New Collection",
            imageSrc: "../images/mensshoes2.jpg",
            imageAlt: "description of the image"
        },
       
    ];

    return (
        <>
            <section className="bg-white py-6 sm:py-8 lg:py-12 sm:mx-5">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    {/* Heading */}
                    <div className="mx-auto max-w-md text-center">
                        <h2 className="font-sans text-2xl font-bold sm:text-3xl">
                            Our Product Categories
                        </h2>
                        <p className="mt-4 text-base text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus
                            massa dignissim tempus.
                        </p>
                    </div>
                    {/* /Heading */}
                </div>
            </section>

            <div className="relative mx-auto max-w-sm sm:px-8 md:max-w-7xl" data-aos='fade-right'>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                >
                    {promos.map((promo) => (
                        <SwiperSlide key={promo.id}>
                            <div className="group relative h-96 md:h-[26rem] shadow rounded-3xl overflow-hidden">
                                <a href={`/productsection/${promo.category}`} className="w-full h-full flex flex-col justify-end items-start relative">
                                    <img
                                        src={promo.imageSrc}
                                        alt={promo.imageAlt}
                                        className="absolute inset-0 w-full h-full object-cover object-top transition duration-200 ease-in transform group-hover:scale-110 rounded-3xl"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-90" />
                                    <div className="relative p-5 space-y-3 font-bold text-white text-opacity-90 group-hover:text-opacity-100">
                                        <p className="text-sm font-medium">{promo.subheading}</p>
                                        <h3 className="text-xl lg:text-2xl font-bold">{promo.name}</h3>
                                    </div>
                                </a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default PromoSection;
