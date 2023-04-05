import {useReducer} from 'react';

import CartContext from "./cart-context";

const cartReducer = (state, action) => {
    if(action.type === 'ADD_ITEM') {
        const updatedCartTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingItem = state.items[existingItemIndex];

        let updatedItems;

        if(existingItem) {
            const updatedItem = {...existingItem, amount: existingItem.amount + action.item.amount};
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedCartTotalAmount
        }
    }
    if(action.type === 'REMOVE_ITEM') {

        let updatedItems;

        const existingItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingItemIndex];

        const updatedTotalAmount = state.totalAmount - state.items[existingItemIndex].price;

        if(existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return {
        items: [],
        totalAmount: 0
    };
}

function CartProvider(props) {
    
    const defaultCart = {
        items: [],
        totalAmount: 0
    };

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

    const onAddItemHandler = item => {
        dispatchCartAction({type: "ADD_ITEM", item: item});
    };

    const onRemoveItemHandler = id => {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: onAddItemHandler,
        removeItem: onRemoveItemHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;