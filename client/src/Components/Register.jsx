import React, { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Otpform from './Otpform';
import { useDispatch } from 'react-redux';
import { handleData } from '../Redux/Register';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGoogleLogin } from '@react-oauth/google';

function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false); // State for loading indicator

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    console.log(data);

    const handlesubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Set loading to true when the form is submitted

        try {
            const res = await axios.post('http://localhost:4005/register/send', data);
            console.log(res);
            const details = data;
            console.log("Details:", details);
            sessionStorage.setItem("email", details.email);
            console.log(res.data.message);
            toast.success(res.data.message);
            setLoading(false); // Set loading to false when data is fetched
            navigate('/verificationform');
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
            setLoading(false); // Set loading to false on error
            navigate('/');
        }
    };

    const [gdata, setGdata] = useState();

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            setLoading(true); // Set loading to true when Google login starts
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`,
                    },
                });
                setGdata(res.data); // Update gdata
                console.log(res);
                // Check if res.data has the required data
                if (res.data) {
                    axios.post("http://localhost:4005/login/glogin", res.data).then((res) => {
                        console.log(res);
                        localStorage.setItem("email", res.data.data.email);
                        localStorage.setItem("role", res.data.data.role);
                        setLoading(false); // Set loading to false after Google login is complete
                        navigate("/userhome");
                        window.location.reload();
                    });
                }
            } catch (error) {
                console.log(error);
                setLoading(false); // Set loading to false on error
            }
        },
    });

    const inputref = useRef(null);

    useEffect(() => {
        inputref.current && inputref.current.focus();
    }, []);
    return (
        <>
            <Navbar />
            {loading ? (
                <div><div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
                    <span class='sr-only'>Loading...</span>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                </div></div>
            ) : (<section className="bg-white h-screen 2xl (1536px) xl (1280px) lg (1024px) md (768px) sm (640px) m-2">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                        <div className="absolute inset-0">
                            <img
                                className="object-cover object-top w-full h-full"
                                src={"../images/bgreg.png.png"}
                                alt=""
                            />
                        </div>
                        <div className="" />

                    </div>
                    <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                        <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
                            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl font-semibold">
                                    <h5>Sign in with</h5>
                                </div>
                                <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12">
                                    <div className="w-3/12 max-w-full px-1 ml-auto flex-0">
                                        <a className="inline-block w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                                            <svg
                                                xmlnsXlink="http://www.w3.org/1999/xlink32"
                                                xmlns="http://www.w3.org/2000/svg"
                                                version="1.1"
                                                viewBox="0 0 64 64"
                                                height="32px"
                                                width="24px"
                                            >
                                                <g fillRule="evenodd" fill="none" strokeWidth={1} stroke="none">
                                                    <g fillRule="nonzero" transform="translate(3.000000, 3.000000)">
                                                        <circle
                                                            r="29.4882047"
                                                            cy="29.4927506"
                                                            cx="29.5091719"
                                                            fill="#3C5A9A"
                                                        />
                                                        <path
                                                            fill="#FFFFFF"
                                                            d="M39.0974944,9.05587273 L32.5651312,9.05587273 C28.6886088,9.05587273 24.3768224,10.6862851 24.3768224,16.3054653 C24.395747,18.2634019 24.3768224,20.1385313 24.3768224,22.2488655 L19.8922122,22.2488655 L19.8922122,29.3852113 L24.5156022,29.3852113 L24.5156022,49.9295284 L33.0113092,49.9295284 L33.0113092,29.2496356 L38.6187742,29.2496356 L39.1261316,22.2288395 L32.8649196,22.2288395 C32.8649196,22.2288395 32.8789377,19.1056932 32.8649196,18.1987181 C32.8649196,15.9781412 35.1755132,16.1053059 35.3144932,16.1053059 C36.4140178,16.1053059 38.5518876,16.1085101 39.1006986,16.1053059 L39.1006986,9.05587273 L39.0974944,9.05587273 L39.0974944,9.05587273 Z"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="w-3/12 max-w-full px-1 flex-0">
                                        <a className="inline-block w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">
                                            <svg
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xmlns="http://www.w3.org/2000/svg"
                                                version="1.1"
                                                viewBox="0 0 64 64"
                                                height="32px"
                                                width="24px"
                                            >
                                                <g fillRule="evenodd" fill="none" strokeWidth={1} stroke="none">
                                                    <g
                                                        fillRule="nonzero"
                                                        fill="#000000"
                                                        transform="translate(7.000000, 0.564551)"
                                                    >
                                                        <path d="M40.9233048,32.8428307 C41.0078713,42.0741676 48.9124247,45.146088 49,45.1851909 C48.9331634,45.4017274 47.7369821,49.5628653 44.835501,53.8610269 C42.3271952,57.5771105 39.7241148,61.2793611 35.6233362,61.356042 C31.5939073,61.431307 30.2982233,58.9340578 25.6914424,58.9340578 C21.0860585,58.9340578 19.6464932,61.27947 15.8321878,61.4314159 C11.8738936,61.5833617 8.85958554,57.4131833 6.33064852,53.7107148 C1.16284874,46.1373849 -2.78641926,32.3103122 2.51645059,22.9768066 C5.15080028,18.3417501 9.85858819,15.4066355 14.9684701,15.3313705 C18.8554146,15.2562145 22.5241194,17.9820905 24.9003639,17.9820905 C27.275104,17.9820905 31.733383,14.7039812 36.4203248,15.1854154 C38.3824403,15.2681959 43.8902255,15.9888223 47.4267616,21.2362369 C47.1417927,21.4153043 40.8549638,25.1251794 40.9233048,32.8428307 M33.3504628,10.1750144 C35.4519466,7.59650964 36.8663676,4.00699306 36.4804992,0.435448578 C33.4513624,0.558856931 29.7884601,2.48154382 27.6157341,5.05863265 C25.6685547,7.34076135 23.9632549,10.9934525 24.4233742,14.4943068 C27.7996959,14.7590956 31.2488715,12.7551531 33.3504628,10.1750144" />
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="w-3/12 max-w-full px-1 mr-auto flex-0">
                                        <a onClick={login} className="inline-block w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75">

                                            <svg
                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                xmlns="http://www.w3.org/2000/svg"
                                                version="1.1"
                                                viewBox="0 0 64 64"
                                                height="32px"
                                                width="24px"
                                            >
                                                <g fillRule="evenodd" fill="none" strokeWidth={1} stroke="none">
                                                    <g fillRule="nonzero" transform="translate(3.000000, 2.000000)">
                                                        <path
                                                            fill="#4285F4"
                                                            d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
                                                        />
                                                        <path
                                                            fill="#34A853"
                                                            d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
                                                        />
                                                        <path
                                                            fill="#FBBC05"
                                                            d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
                                                        />
                                                        <path
                                                            fill="#EB4335"
                                                            d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
                                        <p className="z-20 inline px-4 mb-2 font-semibold leading-normal bg-white text-sm text-slate-400">
                                            or
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-auto p-6">
                                    <form role="form text-left" onSubmit={handlesubmit} >
                                        <div className="mb-4">
                                            <input
                                                ref={inputref}
                                                required={true}
                                                name='name'
                                                onChange={handleInputChange}
                                                aria-describedby="email-addon"
                                                aria-label="Name"
                                                placeholder="Name"
                                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                                type="text"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input

                                                required={true}
                                                name='email'
                                                onChange={handleInputChange}
                                                aria-describedby="email-addon"
                                                aria-label="Email"
                                                placeholder="Email"
                                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                                type="email"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input

                                                required={true}
                                                name='phone'
                                                onChange={handleInputChange}
                                                aria-describedby="email-addon"
                                                aria-label="phone"
                                                placeholder="mobile no"
                                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                                type="text"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <input

                                                required={true}
                                                name='password'
                                                onChange={handleInputChange}
                                                aria-describedby="password-addon"
                                                aria-label="Password"
                                                placeholder="Password"
                                                className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                                                type="password"
                                            />
                                        </div>
                                        <div className="min-h-6 pl-7 mb-0.5 block">
                                            <input

                                                required={true}
                                                defaultChecked=""
                                                defaultValue=""
                                                type="checkbox"
                                                className="w-5 h-5 ease-soft -ml-7 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-200 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                                                id="terms"
                                            />
                                            <label
                                                htmlFor="terms"
                                                className="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700"
                                            >
                                                {" "}
                                                I agree the{" "}
                                                <a className="font-bold text-slate-700">Terms and Conditions</a>
                                                <svg
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4 inline ml-1 fill-current text-green-500"
                                                >
                                                    <path d="M6.293 9.293a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
                                                </svg>
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                type="submit"

                                                className=" mt-4 items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-lg nline-flex hover:bg-black hover:border-black hover:text-white focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                                            >
                                                {" "}
                                                Submit{" "}
                                            </button>
                                        </div>
                                        <p className="mt-4 mb-0 leading-normal text-sm">
                                            Already have an account?{" "}
                                            <a className="font-bold text-slate-700" href="/">
                                                Sign in
                                            </a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>)}






        </>
    )
}

export default Register
