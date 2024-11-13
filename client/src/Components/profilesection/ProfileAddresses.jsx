import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import Profilesidebar from './Profilesidebar';
import Navbar from '../Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfileAddresses() {
  const [newadd, setnewadd] = useState(false);
  const [address, setAddress] = useState([]);
  const [editAddressId, setEditAddressId] = useState(null);


  const userid = localStorage.getItem("id")

  const [loading, setLoading] = useState(false); // State for loading indicator
  const [info, setinfo] = useState({
    Name: '',
    Email: '',
    Phone: '',
    SecondaryPhone: '',
    Address: '',
    City: '',
    State: '',
    PinCode: ''
  });

  // const addresses = [
  //   {
  //     name: "John Doe",
  //     street: "123 Main St",
  //     city: "Anytown",
  //     state: "CA",
  //     zip: "12345",
  //     country: "USA"
  //   },
  //   {
  //     name: "Jane Smith",
  //     street: "456 Maple Ave",
  //     city: "Somewhere",
  //     state: "TX",
  //     zip: "67890",
  //     country: "USA"
  //   }
  // ];

  useEffect(() => {
    if (userid) {
      setLoading(true); // Set loading to true when starting data fetch
      axios.post('http://localhost:4005/user/viewuserdetails', { _id: userid })
        .then((res) => {
          console.log("User Details Response:", res.data);
          const userDetails = res.data.data[0];
          console.log(userDetails);
          setAddress(userDetails.UserAddress)
          setnewadd(false)
          // window.location.reload()
          // setinfo({
          //     Name: userDetails.UserAddress.Name || "",
          //     Email: userDetails.UserAddress.Email,
          //     Phone: userDetails.UserAddress.Phone,
          //     SecondaryPhone: userDetails.SecondaryPhone,
          //     Address: userDetails.UserAddress.Address,
          //     City: userDetails.UserAddress.City,
          //     State: userDetails.UserAddress.State,
          //     PinCode: userDetails.UserAddress.PinCode,

          // });
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((err) => {
          console.error('Error fetching user details:', err);
          setLoading(false); // Set loading to false on error
        });
    } else {
      console.error('User ID is not set');
    }
  }, [userid]);

  // const handleSetPrimary = (index) => {
  //   setPrimaryAddress(index);
  // };

  const handleOnChange = (event) => {
    setinfo({ ...info, [event.target.name]: event.target.value });
  };

  const handleEdit = (index) => {
    // Logic to handle edit action
  };

  const handleDelete = (index, _id) => {
    axios.post('http://localhost:4005/user/deleteaddress', { userid: userid, _id: _id }).then((res) => {
      console.log(res);
      setAddress(address.filter((addr, i) => i !== index))
    })
      .catch((err) => {
        console.log(err);
      })
  };


  const handleeditaddress = (id) => {
    const selectedAddress = address.find(addr => addr._id === id);
    if (selectedAddress) {
      setinfo({
        Name: selectedAddress.Name || '',
        Email: selectedAddress.Email || '',
        Phone: selectedAddress.Phone || '',
        SecondaryPhone: selectedAddress.SecondaryPhone || '',
        Address: selectedAddress.Address || '',
        City: selectedAddress.City || '',
        State: selectedAddress.State || '',
        PinCode: selectedAddress.PinCode || ''
      });
      setEditAddressId(id);
      setnewadd(true);
    }
  };


  const handlesubmit = () => {
    console.log(info);

    axios.post('http://localhost:4005/user/saveaddress', { info, userId: userid, addressId: editAddressId }).then((res) => {
      console.log(res);
      setnewadd(false)
      toast.success(res.data.messsage)
      window.location.reload()
    })
      .catch((err) => {
        console.log(err);
        toast.success(err.data.messsage)
      })
  }
  console.log(info);

  return (
    <>
      <Navbar />
      <div className="font-sans bg-white md:px-24 px-8 py-8">
        <div className="flex max-sm:flex-col gap-4 h-auto">
          {/* Sidebar */}
          <Profilesidebar />

          {/* Main content */}
          <div className="max-w-4xl mx-auto w-full h-max rounded-md p-8 sticky top-0 mt-24 border border-gray-100 shadow-lg" data-aos="fade-left">
            <div className="container mx-auto p-4">
              <h2 className="text-xl font-bold mb-4">Delivery Addresses</h2>
              <div className="space-y-4">
                {address && address.map((addr, index) => (
                  <div key={index} className={`border p-4 rounded-lg shadow-sm relative  'bg-gray-100 border-primary-500' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg font-medium">{addr.Name}</p>
                        <p>{addr.Phone} , {addr.Email}</p>
                        <p>{addr.City}, {addr.State} {addr.PinCode}</p>
                        <p>{addr.country}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleeditaddress(addr._id)}
                          className="text-gray-500 hover:text-gray-800 mx-4"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => {handleDelete(index, addr._id);setLoading(true)}}
                          className="text-gray-500 hover:text-red-600 mx-4"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        {/* <button
                          // onClick={() => handleSetPrimary(index)}
                          className={`text-gray-500 hover:text-yellow-500 'text-yellow-500' : ''}`}
                        >
                          <FontAwesomeIcon icon={faStar} />
                        </button> */}
                      </div>
                    </div>


                  </div>
                ))}
              </div>
            </div>
            {!newadd && (<div className="sm:col-span-2">
              <button
                onClick={() => {
                  setnewadd(true);
                  setinfo({
                    Name: '',
                    Email: '',
                    Phone: '',
                    SecondaryPhone: '',
                    Address: '',
                    City: '',
                    State: '',
                    PinCode: ''
                  });
                  setEditAddressId(null);
                }}
                type="button"
                className="flex w-full mt-4 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
                Add new address
              </button>
            </div>)}


            {newadd && (
              <>

                <div className="mt-8">
                  <h3 className="text-base font-semibold text-gray-800 mb-4">
                    Delivery Address
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="Name"
                        value={info.Name}
                        onChange={handleOnChange}
                        placeholder="First Name"
                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4"
                        viewBox="0 0 24 24"
                      >
                        <circle cx={10} cy={7} r={6} data-original="#000000" />
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"
                        />
                      </svg>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        name="Phone"
                        value={info.Phone}
                        onChange={handleOnChange}
                        placeholder="Phone No."
                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                      />
                      <svg
                        fill="#bbb"
                        className="w-[18px] h-[18px] absolute right-4"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                          data-original="#000000"
                        />
                      </svg>
                    </div>

                    <div className="relative flex items-center">
                      <input
                        type="email"
                        name='Email'
                        value={info.Email}
                        onChange={handleOnChange}
                        placeholder="Email"
                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-[18px] h-[18px] absolute right-4"
                        viewBox="0 0 682.667 682.667"
                      >
                        <defs>
                          <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path d="M0 512h512V0H0Z" data-original="#000000" />
                          </clipPath>
                        </defs>
                        <g
                          clipPath="url(#a)"
                          transform="matrix(1.33 0 0 -1.33 0 682.667)"
                        >
                          <path
                            fill="none"
                            strokeMiterlimit={10}
                            strokeWidth={40}
                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                            data-original="#000000"
                          />
                          <path
                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                            data-original="#000000"
                          />
                        </g>
                      </svg>
                    </div>

                    <div className="relative flex items-center">
                      <input
                        type="number"
                        name="SecondaryPhone"
                        value={info.SecondaryPhone}
                        onChange={handleOnChange}
                        placeholder="Secondary Phone No"
                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                      />
                      <svg
                        fill="#bbb"
                        className="w-[18px] h-[18px] absolute right-4"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                          data-original="#000000"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name='Address'
                      placeholder="Address Line"
                      value={info.Address}
                      onChange={handleOnChange}
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                    <input
                      type="text"
                      name='City'
                      value={info.City}
                      onChange={handleOnChange}
                      placeholder="City"
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                    <input
                      type="text"
                      name='State'
                      value={info.State}
                      onChange={handleOnChange}
                      placeholder="State"
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                    <input
                      type="text"
                      name='PinCode'
                      value={info.PinCode}
                      onChange={handleOnChange}
                      placeholder="Pin Code"
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b focus:border-gray-800 outline-none"
                    />
                  </div>
                  <div className="flex gap-4 max-md:flex-col mt-8">
                    <button
                      type="button"
                      onClick={() => setnewadd(false)}
                      className="rounded-md px-4 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-gray-800 max-md:order-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handlesubmit();
                        setLoading(true);
                      }}
                      className="rounded-md px-4 py-3 w-full text-sm font-semibold bg-gray-800 text-white hover:bg-gray-900"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileAddresses;
