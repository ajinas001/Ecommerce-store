import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const userid = localStorage.getItem("id");
  const [cartData, setCartData] = useState([]);
  const [details, setDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = () => {
    setLoading(true);
    axios.post("http://localhost:4005/cart/viewcart", { userid: userid })
      .then((res) => {
        setDetails(res.data.data);
        setCartData(res.data.cart);

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

  const handleDelete = (id) => {
    axios.post('http://localhost:4005/cart/deletefromcart', { userid: userid, productid: id })
      .then((res) => {
        fetchCartData();
        setQuantities(prevQuantities => {
          const updatedQuantities = { ...prevQuantities };
          delete updatedQuantities[id];
          return updatedQuantities;
        });
      })
      .catch((error) => {
        console.error("Error deleting item: ", error);
      });
  };

  const updateQuantity = (id, quantity) => {
    axios.post('http://localhost:4005/cart/updatequantity', { userid: userid, productid: id, quantity: quantity })
      .then((res) => {
        setQuantities(prevQuantities => ({
          ...prevQuantities,
          [id]: quantity
        }));
        fetchCartData(); // Fetch cart data to update the state
      })
      .catch((error) => {
        console.error("Error updating quantity: ", error);
      });
  };

  const increment = (id) => {
    const newQuantity = (quantities[id] || 0) + 1;
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: newQuantity
    }));
    updateQuantity(id, newQuantity);
  };

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

  return (
    <CartContext.Provider value={{
      cartData,
      details,
      quantities,
      loading,
      increment,
      decrement,
      handleDelete,
      calculateTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
