import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import axios from 'axios'

function Wishlist() {

  const [data, setdata] = useState()
  const userid = localStorage.getItem("id")
  console.log(data);


  useEffect(() => {
    console.log(userid);
    axios.post("http://localhost:4005/user/viewwishlist", { userid: userid }).then((res) => {
      console.log(res);
      if (data !== null && Array.isArray(data) && data.length === 0) {
        setdata("undefined"); // Set data to null
      }
      setdata(res.data.data)
    })
  }, [])

  const handledelete = (id) => {
    axios.post('http://localhost:4005/user/deletefromwishlist', ({ userid: userid, productid: id })).then((res) => {
      console.log(res);
      window.location.reload()
    })
  }
  return (
    <>
      <Navbar />

     
        <section className="h-screen bg-white py-12 sm:py-16 lg:py-10">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            {/* <div className="flex items-center justify-center">
<h1 className="text-2xl font-semibold text-gray-900">Your Wishlist</h1>
</div> */}
            <div className="mx-auto mt-8 max-w-md md:mt-12">
              <div className="rounded-3xl bg-white shadow-lg">
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                  <div className="flow-root">
                    <ul className="-my-8">
                    {data && data.map((item, key) => (
                      <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                        <div className="shrink-0 relative">
                          <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                            1
                          </span>
                          <img
                           onClick={() => { window.location.href = `/viewproductdetails/${item._id}` }}
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
                            </div>
                          </div>
                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              type="button"
                              onClick={()=>handledelete(item._id)}
                              className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                            >
                              <svg
                                className="h-5 w-5"
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
                         ))}
                    </ul>
                  </div>
                  {/* <hr class="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" /> */}
                  <div className="mt-6 space-y-3 border-t border-b py-8">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Subtotal</p>
                      <p className="text-lg font-semibold text-gray-900">$2399.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Shipping</p>
                      <p className="text-lg font-semibold text-gray-900">$8.00</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      <span className="text-xs font-normal text-gray-400">USD</span>{" "}
                      2499.00
                    </p>
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    >
                      Add to cart
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
        </section>
  






      {/* <section>
        <div className="flex font-sans max-w-screen-sm m-10">
          <div className="flex-none w-48 relative">
            <img
              src="/classic-utility-jacket.jpg"
              alt=""
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

      </section>





      <section>
        <div className="flex p-6 font-mono max-w-screen-sm m-10">
          <div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
            <img
              src="/retro-shoe.jpg"
              alt=""
              className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>
          <form className="flex-auto pl-6">
            <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
              <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
                Retro Shoe
              </h1>
              <div className="relative text-lg text-white">$89.00</div>
              <div className="relative uppercase text-teal-400 ml-3">In stock</div>
            </div>
            <div className="flex items-baseline my-6">
              <div className="space-x-3 flex text-sm font-medium">
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    defaultValue="xs"
                    defaultChecked=""
                  />
                  <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
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
                  <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
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
                  <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
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
                  <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
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
                  <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                    XL
                  </div>
                </label>
              </div>
            </div>
            <div className="flex space-x-2 mb-4 text-sm font-medium">
              <div className="flex space-x-4">
                <button
                  className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                  type="submit"
                >
                  Buy now
                </button>
                <button
                  className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900"
                  type="button"
                >
                  Add to bag
                </button>
              </div>
              <button
                className="flex-none flex items-center justify-center w-12 h-12 text-black"
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
            <p className="text-xs leading-6 text-slate-500">
              Free shipping on all continental US orders.
            </p>
          </form>
        </div>

      </section> */}
    </>
  )
}

export default Wishlist
