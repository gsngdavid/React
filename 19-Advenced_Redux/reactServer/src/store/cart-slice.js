import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";

const initialState = {
    items: [],
    totalQuantity: 0,
    changed: false
};

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        },

        add(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            state.changed = true;

            if(!existingItem) {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }
            state.totalQuantity++;
        },

        remove(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            state.changed = true;

            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== action.payload);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
            state.totalQuantity--;
        }
    }
});

export const sendCartData = (cart) => {
    return async dispatch => {
        dispatch(uiActions.showNotification({
            status: 'Pending',
            title: 'Sending Data',
            message: 'Sending Data to backend'
        }));
        
        const sendRequest = async() => {
            
            const response = await fetch("http://localhost:4000/cart", {
                method: 'POST',
                body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
                headers: {'Content-Type': 'application/json'}
              });
        
              if(!response.ok) {
                throw new Error("Sending cart data to database failed!")
              }

          }

          try {
            await sendRequest();
            dispatch(uiActions.showNotification({
              status: 'success',
              title: 'Data sent successfully',
              message: 'Sending Data to backend is Done'
            }));

          } catch (error) {

            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending Cart Data Failed!'
            }));
            
        }
        
    }
}

export const receiveCartData = () => {
    return async dispatch => {
        
        const fetchCartData =  async () => {
            const response = await fetch("http://localhost:4000/cart");
            
            if(!response.ok) {
                throw new Error("Something went wrong!");
            }
            const data = await response.json();

            return data;
        }

        try {
            const cartData = await fetchCartData();
            dispatch(cartActions.replaceCart(cartData));

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Sending Data to backend Failed'
            }));
        }
    }
}

export const cartActions = cartSlice.actions;

export default cartSlice;