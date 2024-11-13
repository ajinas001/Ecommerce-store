import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch wishlist details
export const fetchwishlist = createAsyncThunk('wishlist/fetchwishlist', async (userId) => {
    try {
        const response = await axios.post('http://localhost:4005/user/viewwishlist', { userid: userId });
        return response.data;
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }
});

// Async thunk to add item to wishlist
export const addTowishlist = createAsyncThunk('wishlist/addTowishlist', async ({ userid, productId }) => {
    try {
        const response = await axios.post('http://localhost:4005/user/addtowishlist', { userid, productId });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
    }
});

// Async thunk to remove item from wishlist
export const removeFrowishlist = createAsyncThunk('wishlist/removeFrowishlist', async ({ userid, productId }) => {
    try {
        const response = await axios.post('http://localhost:4005/user/deletefromwishlist', { userid, productid: productId });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
    }
});

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
        inwishlist: {},
        totalwishlist: 0,
        status: 'idle',
        error: null
    },
    reducers: {
        Setinwishlist(state, action) {
            const { productId, isInWishlist } = action.payload;
            state.inwishlist[productId] = isInWishlist;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchwishlist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchwishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data || []; // Ensure items is an array
                state.totalwishlist = action.payload.totalwishlist || 0; // Ensure totalwishlist is a number
                // Initialize inwishlist state based on fetched items
                state.inwishlist = {};
                state.items.forEach(item => {
                    state.inwishlist[item._id] = true; // Assuming item._id is the productId
                });
            })
            .addCase(fetchwishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTowishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data || [];
                state.totalwishlist += 1; // Increment totalwishlist upon successful addition to wishlist
                state.inwishlist[action.payload.productId] = true; // Mark item as in wishlist
            })
            .addCase(addTowishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(removeFrowishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.data || [];
                state.totalwishlist -= 1; // Decrement totalwishlist upon successful removal from wishlist
                state.inwishlist[action.payload.productId] = false; // Mark item as not in wishlist
            })
            .addCase(removeFrowishlist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { Setinwishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
