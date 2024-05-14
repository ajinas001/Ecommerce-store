import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'

function Cart() {
  const userid = localStorage.getItem("id")
  const [data, setdata] = useState(null)
  console.log(data);


  useEffect(() => {
    console.log(userid);
    axios.post("http://localhost:4005/user/viewcart", { userid: userid }).then((res) => {
      console.log(res);
      if (data !== null && Array.isArray(data) && data.length === 0) {
        setdata("undefined"); // Set data to null
      }
      setdata(res.data.data)
    })
  }, [])

  const handledelete = (id) =>{
        axios.post('http://localhost:4005/user/deletefromcart',({userid:userid,productid:id})).then((res)=>{
          console.log(res);
          window.location.reload()
        })
  }
 
  return (
    <>
      <Navbar />

      {data != []  || data!= null ? 
       <section className="h-auto bg-white  py-12 sm:py-16 lg:py-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mx-auto mt-8 max-w-2xl md:mt-12">
            <div className="bg-white shadow-xl rounded-lg">
              <div className="flex items-center justify-center">
                <h1 className="text-2xl font-semibold text-gray-900 mt-4">Cart Items</h1>
              </div>
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">

                  {data && data.map((item, key) => (<>
                    <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                      <div className="shrink-0 relative"
                       onClick={() => { window.location.href = `/viewproductdetails/${item._id}` }}>
                        <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                            1
                          </span>
                        <img
                       
                          className="h-24 w-24 max-w-full rounded-lg object-cover"
                          src={`/uploadedimages/${item.images[0]}`}
                        />
                      </div>
                      <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div className="pr-8 sm:pr-5">
                            <p className="text-base font-semibold text-gray-900">
                              {item.Name}
                            </p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                              {item.Category}
                            </p>
                          </div>
                          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                              INR {item.Price}
                            </p>
                            <div className="sm:order-1">
                              <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
                                  -
                                </button>
                                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                  1
                                </div>
                                <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button
                          onClick={()=>{handledelete(item._id)}}
                            type="button"
                            
                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                          >
                            <svg
                              className="block h-5 w-5"
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
                                className=""
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                    </>))}
                  </ul>
                </div>
                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">$399.00</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">$8.00</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">USD</span>{" "}
                    408.00
                  </p>
                </div>
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  >
                    Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> :
      <h1 className='text-6xl m-10 text-center my-40'> Your Cart is Empty!!</h1>
      }
     



    </>
  )
}

export default Cart
