import React, { useRef, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Otpform() {

    const [timer, setTimer] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const navigate = useNavigate();
    const [details,setdetails] = useState()
    const [value,setvalue] = useState()
    let reg = []

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                setIsTimerRunning(false);
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);
    const email = sessionStorage.getItem("email");

   useEffect(()=>{
    axios.post('http://localhost:4005/register/refetching', {email:email}).then((res)=>{
        console.log(res);
        setvalue(res.data.data)
    })
    .catch((err)=>{
        console.log(err);
    })
   },[])

    // const data = {
    //     name: name,
    //     email: email,
    //     phone: phone,
    //     password: password,
    // }


    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    useEffect(() => {
        inputRefs[0].current && inputRefs[0].current.focus();
    }, []);

    const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));

    const handleInputChange = (index, e) => {
        const inputValue = e.target.value;
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = inputValue;
        setOtpDigits(newOtpDigits);

        const input = e.target;
        const nextInputIndex = index + 1;

        if (inputValue && nextInputIndex < inputRefs.length) {
            inputRefs[nextInputIndex].current.focus();
        }
    };

    const savedetails = ()=>{
        console.log(details,"details");
        axios.post('http://localhost:4005/register/save', details).then((res)=>{
            console.log(res);
            toast.success("Registered successfully")
        })
        .catch((err)=>{
            console.log(err);
            toast.error(err)
        })
    }

    useEffect(() => {
        if (details) {
            savedetails();
             navigate('/');
        }
    }, [details]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const otpCode = otpDigits.join(''); // Join OTP digits into a single string
        axios.post('http://localhost:4005/register/verify', { code: otpCode, email: email })
            .then((res) => {
                console.log(res, "verification response");
                toast.success("verified successfully");
                setdetails(res.data.data); // Set the details state
               
            })
            .catch((err) => {
                console.log(err);
                toast.error("verification failed . Invalid Otp!!");
                navigate('/register');
            });
    };
    
    

    const handleresend = async (event) => {
        event.preventDefault();
        setTimer(60)
        setIsTimerRunning(true)
    
        try {
            const res = await axios.post('http://localhost:4005/register/send', value);
            console.log(res);

            console.log(res.data.message);
            toast.success(res.data.message)
            navigate('/verificationform');
        } catch (error) {
            toast.error(error.response.data.message)
            console.error(error);
            navigate('/')
        }
    };
    return (
        <>
            <Navbar />
            <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                            <div className="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email :- {email}</p>
                            </div>
                        </div>
                        <div>
                            <form >
                                <div className="flex flex-col space-y-16">
                                    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-s">
                                        {otpDigits.map((digit, index) => (
                                            <div className="w-16 h-16" key={index}>
                                                <input
                                                    ref={inputRefs[index]}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    maxLength={1}
                                                    value={digit}
                                                    className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-700"
                                                    type="text"
                                                    name=""
                                                    id=""
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col space-y-5">
                                        {isTimerRunning ? (
                                            <button onClick={handleSubmit} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-black border-none text-white text-sm shadow-sm">
                                                Verify Account ({timer}s)
                                            </button>
                                        ) : (
                                            <button onClick={handleresend} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-black border-none text-white text-sm shadow-sm">
                                                Resend OTP
                                            </button>
                                        )}
                                        {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't receive code?</p>{" "}
                                            <a
                                                className="flex flex-row items-center text-gray-600"
                                                href="#"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Resend
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Otpform;
