import React, { useRef, useState } from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Forgotpass() {

    const inputref = useRef(null)
    const [data,setdata] = useState({
        email:''
    })

    const navigate = useNavigate()
    const handleonchange =  (event)=>{
        const {name,value} = event.target
        setdata({...data,[name]:value})
    }

    sessionStorage.clear()
    sessionStorage.setItem("email",data.email)

    const handlesubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:4005/register/forgototp',{email:data.email}).then((res)=>{
            console.log(res);
            navigate('/forgotpassotpcomp')
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <>
            <Navbar />
            <section className='my-36 mx-5'>
                <div className="bg-white relative items-center w-full my-5 px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl border border-black fit-content rounded-lg max-w-lg">
                    <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                        <div className="flex flex-col">
                            <div>
                                <h3 className="text-3xl text-black text-center">Email verification</h3>
                            </div>
                        </div>
                        <form>
                            <input
                                ref={inputref}
                                required={true}
                                type="hidden"
                                name="_redirect"
                            />
                            <div className="mt-4 space-y-6">
                                <div className="col-span-full">
                                    <label className="block mb-3 text-sm font-medium text-gray-600">
                                        {" "}
                                        Email{" "}
                                    </label>
                                    <input
                                        name='email'
                                        onChange={handleonchange}
                                        type="email"
                                        required={true}
                                        placeholder="Email"
                                        className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:gray-blue-500 sm:text-sm"
                                    />
                                </div>
                                {/* <div className="col-span-full">
                                    <label className="block mb-3 text-sm font-medium text-gray-600">
                                        {" "}
                                        Password{" "}
                                    </label>
                                    <input
                                        type="password"
                                        name='password'
                                        onChange={handleonchange}
                                        placeholder="******"
                                        className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                    />
                                </div> */}
                                {/* <p className="mt-4 mb-0 leading-normal text-sm place-content-end">
                                    <a className="font-bold text-slate-700" href="/">
                                        Forgot password?
                                    </a>
                                </p> */}
                                <div className="col-span-full">
                                    <button
                                        onClick={handlesubmit}
                                        type="submit"
                                        className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex  focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                                    >
                                        {" "}
                                        Submit for otp{" "}
                                    </button>
                                    <button
                                        type="submit"
                                        className="mt-2 items-center justify-center w-full px-6 py-2.5 text-center text-black duration-200 bg-white border-2 border-black rounded-full nline-flex "
                                    >
                                        {" "}
                                        Cancel{" "}
                                    </button>
                                </div>
                            </div>
                            {/* <p className="mt-4 mb-0 leading-normal text-sm">
                                Don't have an account?{" "}
                                <a className="font-bold text-slate-700" href="/register">
                                    Sign up
                                </a>
                            </p> */}
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Forgotpass
