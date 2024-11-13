import React, { useRef, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'



function Productform() {
    const inputref = useRef(null)
    const [files, setFiles] = useState([])
    const [data, setdata] = useState({
        Name: "",
        Price: "",
        Size: "",
        Stock: "",
        Discount: "",
        Category: "",
        images: [],
    });
    console.log(data);
    useEffect(() => {
        inputref.current && inputref.current.focus();
    }, []);

    const setRegister = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const validation = (e) => {
        e.preventDefault();


        if (files.length > 0) {
            const Data = new FormData();
            files.forEach((files) => {
                Data.append("files", files);
            });

            axios
                .post("http://localhost:4005/admin/upload-images", Data)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log("Error in POST request:", err);
                });

                console.log(data,"dat");
            axios.post("http://localhost:4005/admin/add-product", data)
                .then((res) => {
                    localStorage.setItem("formfill", "added")
                    console.log("Response from POST request:", res);
                    toast.success(res.data.message);
                })
                .catch((err) => {
                    console.log("Error in POST request:", err);
                    toast.error(err.response.data.message);
                })

        }


    };
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Add product Form
                    </h2>
                    <form className="flex flex-col">
                        <input
                            type="text"
                            name='Name'
                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500 transition ease-in-out duration-150"
                            placeholder="Name"
                            onChange={setRegister}
                        />
                        <input
                            type="text"
                            name='Price'
                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500 transition ease-in-out duration-150"
                            placeholder="Price"
                            onChange={setRegister}
                        />
                        <input
                            type="text"
                            name='Size'
                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500 transition ease-in-out duration-150"
                            placeholder="Size"
                            onChange={setRegister}
                        />
                        <input
                            type="text"
                            name='Stock'
                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500 transition ease-in-out duration-150"
                            placeholder="Stock"
                            onChange={setRegister}
                        />
                        <input
                            type="text"
                            name='Discount'
                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500 transition ease-in-out duration-150"
                            placeholder="Discount"
                            onChange={setRegister}
                        />
                         <input
                            type="text"
                            name='Category'
                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500 transition ease-in-out duration-150"
                            placeholder="Category"
                            onChange={setRegister}
                        />
                        {/* <textarea
                            name="cover_letter"
                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Cover Letter"
                            defaultValue={""}
                        /> */}
                        <input
                            type="file"
                            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            placeholder="Images"
                            name="images"
                            multiple
                            onChange={(e) => {
                                console.log(e.target.files);
                                setFiles([...e.target.files]);
                                setdata({
                                    ...data,
                                    images: [...e.target.files].map((file) => file.name),
                                });
                            }}
                            // onClick={() => {
                            //     setFormErrors({ ...formErrors, images: "" });
                            // }}
                            id="formFile"
                        />
                        <button
                            type="submit"
                            onClick={validation}
                            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-gray-600 hover:to-gray-800 transition ease-in-out duration-150"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* <section>
                <div className="bg-white relative items-center w-full px-5 py-12 mx-auto my-16 md:px-12 lg:px-20 max-w-7xl">
                    <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
                        <div className="flex flex-col">
                            <div>
                                <h2 className="text-4xl text-black">Sign in</h2>
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
                                        onChange={''}
                                        type="email"
                                        required={true}
                                        placeholder="Email"
                                        className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:gray-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-full">
                                    <label className="block mb-3 text-sm font-medium text-gray-600">
                                        {" "}
                                        Password{" "}
                                    </label>
                                    <input
                                        type="password"
                                        name='password'
                                        onChange={'handleonchange'}
                                        placeholder="******"
                                        className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                                    />
                                </div>
                                <p className="mt-4 mb-0 leading-normal text-sm place-content-end">
                                    <a className="font-bold text-slate-700" href="/forgotpass">
                                        Forgot password?
                                    </a>
                                </p>



                                <div class="px-6 sm:px-0 max-w-sm">
                                    <button type="button" onClick={''} class="text-white w-full  bg-black  focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
                                </div>
                                <div className="col-span-full">
                                    <button
                                        onClick={''}
                                        type="submit"
                                        className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                                    >
                                        {" "}
                                        Login{" "}
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={''}
                                        className="mt-2 items-center justify-center w-full px-6 py-2.5 text-center text-black duration-200 bg-white border-2 border-black rounded-full nline-flex "
                                    >
                                        {" "}
                                        Cancel{" "}
                                    </button>
                                </div>
                            </div>
                            <p className="mt-4 mb-0 leading-normal text-sm">
                                Don't have an account?{" "}
                                <a className="font-bold text-slate-700" href="/register">
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </section> */}
        </>
    )
}

export default Productform
