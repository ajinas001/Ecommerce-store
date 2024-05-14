import React, { useRef, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Updatepass() {


    const inputref  =useRef(null)

    const [data,setdata]= useState({
        password:"",
        confirmpassword:"",
    })

    const handleonchange =(event)=>{
        const{name,value} = event.target
        setdata({...data,[name]:value})
    }

    const email = sessionStorage.getItem("email")
    const navigate = useNavigate()

    const handlesubmit = (e)=>{
        e.preventDefault()
        if(data.password===data.confirmpassword){
            axios.put("http://localhost:4005/register/updatepass",{password:data.password,email:email}).then((res)=>{
                console.log(res);
                toast.success(res.data.message)
                navigate('/')
            })
            .catch((err)=>{
                console.log(err);
                toast.error(err.response.data.message)
            })
        }
        else{
            toast.error("Please ensure your password!")
        }
    }
  return (
    <>
      <Navbar/>
      <section className='my-24 mx-5'>
                <div className="bg-white relative items-center w-full my-5 px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl border border-black fit-content rounded-lg max-w-lg">
                    <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                        <div className="flex flex-col">
                            <div>
                                <h3 className="text-3xl text-black text-center">Change password</h3>
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
                                        Password{" "}
                                    </label>
                                    <input
                                        type="password"
                                        name='password'
                                        onChange={handleonchange}
                                        placeholder="******"
                                        className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-full">
                                    <label className="block mb-3 text-sm font-medium text-gray-600">
                                        {" "}
                                       Confirm Password{" "}
                                    </label>
                                    <input
                                        type="password"
                                        name='confirmpassword'
                                        onChange={handleonchange}
                                        placeholder="******"
                                        className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                    />
                                </div>
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
                                        Change{" "}
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

export default Updatepass
