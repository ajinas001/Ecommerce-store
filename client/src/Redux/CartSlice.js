import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch cart details
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
    try {
        const response = await axios.post('http://localhost:4005/cart/viewcart', { userid: userId });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
});

// Async thunk to add item to cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ userid, productId ,size }) => {
    try {
        const response = await axios.post('http://localhost:4005/cart/add-to-cart', { userid, productId, quantity: 1,size:size });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
});

// Async thunk to remove item from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ userid, productId }) => {
    try {
        const response = await axios.post('http://localhost:4005/cart/deletefromcart', { userid, productid: productId });
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
});
export const decrementquantity = createAsyncThunk('cart/decrementquantity', async ({ userid, productId }) => {
    try {
        const response = await axios.post('http://localhost:4005/cart/decrementquantity', { userid, productid: productId });
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        incart: {}, // Tracks whether an item is in cart or not
        totalQuantity: 0,
        status: 'idle',
        error: null,
    },
    reducers: {
        setInCart(state, action) {
            const { productId, isInCart } = action.payload;
            state.incart[productId] = isInCart;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data; // Assuming data contains products
                state.totalQuantity = action.payload.totalQuantity; // Update totalQuantity from backend response
                // Initialize incart state based on fetched items
                state.incart = {};
                state.items.forEach(item => {
                    state.incart[item._id] = true; // Assuming item._id is the productId
                });
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data; // Assuming data contains updated cart items
                state.totalQuantity += 1; // Increment totalQuantity upon successful addition to cart
                state.incart[action.payload.productId] = true; // Mark item as in cart
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data; // Assuming data contains updated cart items
                state.totalQuantity -= 1; // Decrement totalQuantity upon successful removal from cart
                state.incart[action.payload.productId] = false; // Mark item as not in cart
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(decrementquantity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data; // Assuming data contains updated cart items
                state.totalQuantity -= 1; // Decrement totalQuantity upon successful removal from cart
                state.incart[action.payload.productId] = false; // Mark item as not in cart
            })
            .addCase(decrementquantity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            
            
            
    }
});

export const { setInCart } = cartSlice.actions;

export default cartSlice.reducer;
