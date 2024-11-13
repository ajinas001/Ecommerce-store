import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Profilesidebar from './Profilesidebar';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Myorders() {
  const id = localStorage.getItem("id");
  const [details, setDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [sizes, setSizes] = useState({});
  const [address, setAddress] = useState({});
  
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  
  useEffect(() => {
    axios.post('http://localhost:4005/user/viewallorders', { userid: id }).then((res) => {
      const orderData = res.data.data;
      setAddress(orderData.UserAddress || {});
      setDetails(orderData);
      const itemCounts = {};
      const itemSizes = {};
      orderData.forEach(order => {
        order.products.forEach(product => {
          itemCounts[product.productId] = product.quantity;
          itemSizes[product.productId] = product.size;
        });
      });
      setQuantities(itemCounts);
      setProducts(res.data.products);
    }).catch((err) => {
      console.error(err);
    });
  }, [id]);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="font-sans bg-white min-h-screen px-4 py-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <Profilesidebar />
            <div className="flex-1">
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-3xl font-semibold mt-8 mb-4">Your Orders</h2>
                <p className="text-gray-600 mb-6">Check the status of recent orders, manage returns, and discover similar products.</p>
                <div className="space-y-6">
                  {details.map((order, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow p-4">
                      <h3 className="md:text-2xl font-semibold mb-4 sm:text-base">Order : {order._id}</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {order.products.map((product, idx) => {
                          const productDetails = products.find(p => p._id === product.productId);
                          return (
                            <div key={idx} className="bg-white p-2 rounded-lg">
                              {productDetails && (
                                <>
                                  <img className="w-20 h-20 object-cover rounded-md mb-2" src={`../uploadedimages/${productDetails.images[0]}`} alt={productDetails.name} />
                                  <h4 className="text-sm font-semibold mb-1">{productDetails.Name}</h4>
                                  <p className="text-gray-800 text-xs">INR: {productDetails.Price}</p>
                                  <p className="text-gray-800 text-xs">Qty: {quantities[product.productId]}</p>
                                  <p className="text-gray-800 text-xs">Size: {sizes[product.productId ]}</p>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <button 
                          className="bg-white text-red-600 border border-red-600 py-2 px-4 rounded-md hover:bg-red-800 hover:text-white"
                          onClick={() => navigate('/orderdetails', { state: { order } })}
                        >
                         Cancel order
                        </button>
                        <button
                          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                          onClick={() => navigate(`/trackorder/${order._id}`)}
                        >
                          Track Your Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Myorders;
