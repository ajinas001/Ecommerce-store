import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Adminallorders from '../../Components/Admin/Adminallorders'

function Admincontent() {

  const [data, setdata] = useState()

  useEffect(() => {
    axios.get('http://localhost:4005/user/viewsectionallproduct').then((res) => {
      setdata(res.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="flex items-center mb-1">
                  <div className="text-2xl font-semibold">2</div>
                </div>
                <div className="text-sm font-medium text-gray-400">Users</div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-more-fill" />
                </button>
                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <a
              href="/gebruikers"
              className="text-[#f84525] font-medium text-sm hover:text-red-800"
            >
              View
            </a>
          </div>
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-4">
              <div>
                <div className="flex items-center mb-1">
                  <div className="text-2xl font-semibold">100</div>
                  <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                    +30%
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-400">Companies</div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-more-fill" />
                </button>
                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <a
              href="/dierenartsen"
              className="text-[#f84525] font-medium text-sm hover:text-red-800"
            >
              View
            </a>
          </div>
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="text-2xl font-semibold mb-1">{data?.length}</div>
                <div className="text-sm font-medium text-gray-400">Products</div>
              </div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-more-fill" />
                </button>
                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <a
              href=""
              className="text-[#f84525] font-medium text-sm hover:text-red-800"
            >
              View
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
            <div className="rounded-t mb-0 px-0 border-0">
              <div className="flex flex-wrap items-center px-4 py-2">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                    Users
                  </h3>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Role
                      </th>
                      <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Amount
                      </th>
                      <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-gray-700 dark:text-gray-100">
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        Administrator
                      </th>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        1
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">70%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div
                                style={{ width: "70%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-700 dark:text-gray-100">
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        User
                      </th>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        6
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">40%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div
                                style={{ width: "40%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-700 dark:text-gray-100">
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        User
                      </th>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        5
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">45%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                              <div
                                style={{ width: "45%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-700 dark:text-gray-100">
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        User
                      </th>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        4
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">60%</span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                              <div
                                style={{ width: "60%" }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>


          <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
              <div className="flex items-center justify-between pb-6">
                <div>
                  <h2 className="font-semibold text-gray-700">User Accounts</h2>
                  <span className="text-xs text-gray-500">View accounts of registered users</span>
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="ml-10 space-x-8 lg:ml-40">
                    <button className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                        />
                      </svg>
                      CSV
                    </button>
                  </div>
                </div> */}
              </div>
              <div className="overflow-y-hidden rounded-lg border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-900 text-left text-xs font-semibold uppercase tracking-widest text-white">
                        <th className="px-5 py-3">ID</th>
                        <th className="px-5 py-3">Full Name</th>
                        <th className="px-5 py-3">User Role</th>
                        <th className="px-5 py-3">Created at</th>
                        <th className="px-5 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500">
                      <tr>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">3</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Besique Monroe</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Administrator</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Sep 28, 2022</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">Active</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">7</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">James Cavier</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Author</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Sep 28, 2022</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">Active</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">12</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Elvis Son</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Editor</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Sep 28, 2022</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <span className="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-900">Suspended</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">66</p>
                        </td>
                        <td className="bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Dana White</p>
                        </td>
                        <td className="bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Administrator</p>
                        </td>
                        <td className="bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Sep 28, 2022</p>
                        </td>
                        <td className="bg-white px-5 py-5 text-sm">
                          <span className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">Inactive</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">12</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Elvis Son</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Editor</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">Sep 28, 2022</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <span className="rounded-full bg-yellow-200 px-3 py-1 text-xs font-semibold text-yellow-900">Suspended</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                  <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to 5 of 12 Entries </span>
                  <div className="mt-2 inline-flex sm:mt-0">
                    <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Prev</button>
                    <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-100 shadow-md shadow-black/5 px-4  rounded-md lg:col-span-2">
            {/* <div className="flex justify-between mb-4 items-start">
              <div className="font-medium">Order Statistics</div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-more-fill" />
                </button>
                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="rounded-md border border-dashed border-gray-200 p-4">
                <div className="flex items-center mb-0.5">
                  <div className="text-xl font-semibold">10</div>
                  <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">
                    $80
                  </span>
                </div>
                <span className="text-gray-400 text-sm">Active</span>
              </div>
              <div className="rounded-md border border-dashed border-gray-200 p-4">
                <div className="flex items-center mb-0.5">
                  <div className="text-xl font-semibold">50</div>
                  <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">
                    +$469
                  </span>
                </div>
                <span className="text-gray-400 text-sm">Completed</span>
              </div>
              <div className="rounded-md border border-dashed border-gray-200 p-4">
                <div className="flex items-center mb-0.5">
                  <div className="text-xl font-semibold">4</div>
                  <span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">
                    -$130
                  </span>
                </div>
                <span className="text-gray-400 text-sm">Canceled</span>
              </div>
            </div> */}
             <Adminallorders />
            {/* <div className=''>
              <canvas id="order-cha" />
             
            </div> */}
          </div>
          <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <div className="flex justify-between mb-4 items-start">
              <div className="font-medium">Earnings</div>
              <div className="dropdown">
                <button
                  type="button"
                  className="dropdown-toggle text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-more-fill" />
                </button>
                <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[460px]">
                <thead>
                  <tr>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                      Service
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                      Earning
                    </th>
                    <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-emerald-500">
                        +$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-rose-500">
                        -$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Withdrawn
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-emerald-500">
                        +$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-rose-500">
                        -$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Withdrawn
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-emerald-500">
                        +$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-rose-500">
                        -$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Withdrawn
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-emerald-500">
                        +$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-rose-500">
                        -$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Withdrawn
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-emerald-500">
                        +$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <div className="flex items-center">
                        <img
                          src="https://placehold.co/32x32"
                          alt=""
                          className="w-8 h-8 rounded object-cover block"
                        />
                        <a
                          href="#"
                          className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                        >
                          Create landing page
                        </a>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-rose-500">
                        -$235
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">
                        Withdrawn
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* End Content */}
    </>
  )
}

export default Admincontent
