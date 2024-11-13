import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Adminallorders() {
  const [orders, setOrders] = useState([]);

  const fetchOrderData = async () => {
    try {
      const res = await axios.post('http://localhost:4005/user/viewallorders');
      console.log('Order Data:', res.data.data);
      setOrders(res.data.data || []);
    } catch (error) {
      console.error("Error fetching order data: ", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const handleStatusChange = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      console.log(`Updating status of order ${orderId} to ${newStatus}`);
      axios.post('http://localhost:4005/orderrouter/orderstatus',{orderid:orderId,Status:newStatus}).then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log("error",err);
      })
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, Status: newStatus }; // Ensure `Status` is updated here
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const statuses = ['ORDER-PLACED', 'SHIPPED', 'IN-TRANSIT', 'DELIVERED'];

  const getStatusClasses = (status) => {
    switch (status) {
      case 'ORDER-PLACED':
        return 'bg-blue-100 text-gray-900 dark:bg-gray-900 dark:text-gray-300';
      case 'SHIPPED':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'IN-TRANSIT':
        return 'bg-orange-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-transparent';
    }
  };

  const getSelectStatusClasses = (status) => {
    switch (status) {
      case 'ORDER-PLACED':
        return 'bg-blue-100 dark:bg-gray-900 dark:text-gray-300';
      case 'SHIPPED':
        return 'bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'IN-TRANSIT':
        return 'bg-orange-100 dark:bg-blue-900 dark:text-blue-300';
      case 'DELIVERED':
        return 'bg-green-100 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-transparent';
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">All Orders</h2>
            <div className="mt-6 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center sm:space-x-4">
              <div className="flex items-center">
                <label htmlFor="order-type" className="sr-only">Select order type</label>
                <select id="order-type" className="min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500">
                  <option selected>All orders</option>
                  <option value="pre-order">Pre-order</option>
                  <option value="transit">In transit</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <span className="text-gray-500 dark:text-gray-400">from</span>
              <div className="flex items-center">
                <label htmlFor="duration" className="sr-only">Select duration</label>
                <select id="duration" className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500">
                  <option selected>this week</option>
                  <option value="this month">this month</option>
                  <option value="last 3 months">the last 3 months</option>
                  <option value="last 6 months">the last 6 months</option>
                  <option value="this year">this year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <div key={order._id} className="flex flex-wrap items-center gap-y-4 py-6">
                  <dl className="flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      <a href="#" className="truncate w-24 block">{order._id}</a>
                    </dd>
                  </dl>
                  <dl className="flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Customer:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{order.Name}</dd>
                  </dl>
                  <dl className="flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{new Date(order.createdAt).toLocaleDateString()}</dd>
                  </dl>
                  <dl className="flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">INR {order.TotalPrice}</dd>
                  </dl>
                  <dl className="flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                    <dd className="mt-1.5">
                      <div className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(order.Status)}`}>
                        <svg className="h-3 w-3 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917L9.724 16.5 19 7.5" />
                        </svg>
                        <select
                          value={order.Status} // Ensure `Status` is used here
                          onChange={(e) => handleStatusChange(e, order._id)}
                          className={`border-none focus:outline-none focus:ring-0 ${getSelectStatusClasses(order.Status)}`}
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </dd>
                  </dl>
                  <div className="flex items-center gap-4">
                    {order.Status!=='DELIVERED'?(<button type="button" className="rounded-lg border border-red-700 px-3 py-2 mt-4 ms-1 w-auto text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900">
                      Cancel order
                    </button>):<button type="button" className="rounded-lg border border-red-700 px-3 py-2 mt-4 ms-1 w-auto text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900">
                      Return order
                    </button>}
                    <a href={`/trackorder/${order._id}`} className="rounded-lg border border-gray-200 bg-white px-3 py-2 mt-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                      View details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <nav className="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
              <li>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-l-lg border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Previous</span>
                  <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                  </svg>
                </a>
              </li>
              {[1, 2, 3, '...', 100].map((page, index) => (
                <li key={index}>
                  <a href="#" className={`flex h-8 w-8 items-center justify-center border ${page === '...' ? 'border-gray-300 bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400' : page === 3 ? 'border-primary-300 bg-primary-50 text-primary-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}>
                    {page}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-r-lg border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Next</span>
                  <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

  );
}

export default Adminallorders;
