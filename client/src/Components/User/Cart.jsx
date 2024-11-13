import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, decrementquantity, removeFromCart } from '../../Redux/CartSlice';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';


function Cart() {
  const userid = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true

  useEffect(() => {
 axios.post('http://localhost:4005/login/verify').then((res)=>{
  console.log(res);
 })
 .catch((err)=>{
    console.log(err);
    
    navigate('/')
    toast.error("Authorization failed Please login again")
 })
    fetchCartData();
  }, []);
  useEffect(() => {
    Aos.init({ duration: 1500 });
}, []);

  const fetchCartData = () => {
    setLoading(true);
    axios.post("http://localhost:4005/cart/viewcart", { userid: userid })
      .then((res) => {
        setDetails(res.data.data);
        // setData(res.data.cart);

        const itemCounts = {};
        if (res.data.cart && res.data.cart.products) {
          res.data.cart.products.forEach(product => {
            itemCounts[product.productId] = product.quantity;
          });
        }
        setQuantities(itemCounts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart data: ", error);
        setLoading(false);
      });
  };

const dispatch = useDispatch()
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart({ userid, productId }))
        .then(() => {
            // dispatch(setInCart({ productId, isInCart: false }));
            fetchCartData();
            toast.success('Removed from cart');
        })
        .catch((error) => {
            console.error('Failed to remove from cart:', error);
            toast.error('Failed to remove from cart');
        });
};
const handleAddToCart = (productId) => {
  dispatch(addToCart({ userid, productId, quantity: 1 }))
      .then(() => {
        const newQuantity = (quantities[productId] || 0) + 1;
        setQuantities(prevQuantities => ({
          ...prevQuantities,
          [productId]: newQuantity
        }));
        // updateQuantity(productId, newQuantity);
          // dispatch(setInCart({ productId, isInCart: true }));
          // toast.success('Added to cart');
      })
      .catch((error) => {
          console.error('Failed to add to cart:', error);
          // toast.error('Failed to add to cart');
      });
};
const decrementing = (productId) => {
  dispatch(decrementquantity({ userid, productId, quantity: 1 }))
      .then(() => {
        if (quantities[productId] > 1) {
          const newQuantity = quantities[productId] - 1;
          setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: newQuantity
          }))}
        // updateQuantity(productId, newQuantity);
          // dispatch(setInCart({ productId, isInCart: true }));
          // toast.success('Added to cart');
      })
      .catch((error) => {
          console.error('Failed to add to cart:', error);
          // toast.error('Failed to add to cart');
      });
};
  // const handleDelete = (id) => {
  //   axios.post('http://localhost:4005/cart/deletefromcart', { userid: userid, productid: id }).then((res) => {
  //     fetchCartData();
  //     setQuantities(prevQuantities => {
  //       const updatedQuantities = { ...prevQuantities };
  //       delete updatedQuantities[id];
  //       return updatedQuantities;
  //     });
  //   }).catch((error) => {
  //     console.error("Error deleting item: ", error);
  //   });
  // };

  const updateQuantity = (id, quantity) => {
    axios.post('http://localhost:4005/cart/updatequantity', { userid: userid, productid: id, quantity: quantity }).then((res) => {
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [id]: quantity
      }));
    }).catch((error) => {
      console.error("Error updating quantity: ", error);
    });
  };

  // const increment = (id) => {
  //   const newQuantity = (quantities[id] || 0) + 1;
  //   setQuantities(prevQuantities => ({
  //     ...prevQuantities,
  //     [id]: newQuantity
  //   }));
  //   updateQuantity(id, newQuantity);
  // };

  const decrement = (id) => {
    if (quantities[id] > 1) {
      const newQuantity = quantities[id] - 1;
      setQuantities(prevQuantities => ({
        ...prevQuantities,
        [id]: newQuantity
      }));
      updateQuantity(id, newQuantity);
    }
  };

  const offerprice = (data) => {
    if (!data || !data.Price) {
      return 0;
    }

    const Price = parseInt(data.Price);
    const Discount = parseInt(data.Discount || 0);

    if (isNaN(Price)) {
      return 0;
    }

    if (isNaN(Discount) || Discount === 0) {
      return Price;
    }

    const discountedPrice = Price - (Price * Discount / 100);
    return discountedPrice;
  };

  const calculateTotal = () => {
    return details.reduce((total, item) => {
      const itemQuantity = quantities[item._id] || item.quantity;
      return total + (offerprice(item) * itemQuantity);
    }, 0);
  };

  const navigate = useNavigate();

  const checkout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      ) : (
        details && details.length > 0 ?
          <section className="h-auto bg-white py-12 sm:py-16 lg:py-10">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto mt-8 max-w-3xl md:mt-12">
                <div className="bg-white shadow-xl rounded-lg">
                  <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-semibold text-gray-900 mt-1">Cart Items</h1>
                  </div>
                  <div className="px-4 py-6 sm:px-8 sm:py-10">
                    <div className="flow-root">
                      <ul className="-my-8">
                        {details.map((item) => (
                          <li key={item._id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0" data-aos= ''>
                            <div className="shrink-0 relative"
                              onClick={() => { window.location.href = `/viewproductdetails/${item._id}` }}>
                              <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                                {quantities[item._id] || item.quantity}
                              </span>
                              <img
                                className="h-28 w-28 max-w-full rounded-lg object-cover"
                                src={`/uploadedimages/${item.images[0]}`}
                                alt={item.Name}
                              />
                              {item.Discount && item.Discount > 0 ? (
                                <span className="absolute top-0 left-8 m-2 flex h-auto w-auto items-center justify-center rounded-full bg-black px-2 text-center text-[6px] font-medium text-white">
                                  {item.Discount}% OFF
                                </span>
                              ) : null}
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
                                    INR {offerprice(item)}
                                  </p>
                                  <div className="sm:order-1">
                                    <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                      <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                        onClick={() => decrementing(item._id)}>
                                        -
                                      </button>
                                      <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                        {quantities[item._id] || item.quantity}
                                      </div>
                                      <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                        onClick={() => handleAddToCart(item._id)}>
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                <button
                                  onClick={() => handleRemoveFromCart(item._id)}
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
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 border-t border-b py-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Subtotal</p>
                        <p className="text-lg font-semibold text-gray-900">{`INR ${calculateTotal()}`}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">Shipping</p>
                        <p className="text-lg font-semibold text-gray-900">INR 00.00</p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Total</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        <span className="text-xs font-normal text-gray-400">INR</span>{" "}
                        {calculateTotal() + 0}
                      </p>
                    </div>
                    <div className="mt-6 text-center">
                      <button
                        type="button"
                        onClick={checkout}
                        className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-900"
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
          <div className="flex flex-col items-center justify-center h-full py-20 bg-white">
            <img
              src="../images/cartEmpty.png" // Replace with a relevant image URL
              alt="Empty Cart"
              className="mt-4 mb-8"
            />
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <a
              href="/userhome"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Start Shopping
              <svg
                className="ml-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
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
            </a>
          </div>
      )}
    </>
  );
}

export default Cart;
