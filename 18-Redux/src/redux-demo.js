const redux = require('redux');

const storeReducer = (state = {counter: 0}, action) => {
    if(action.type === 'increment') {
        return {
            counter: state.counter + 1
        };
    }
    if(action.type === 'decrement') {
        return {
            counter: state.counter - 1
        };
    }

    return state;
}

const store = redux.legacy_createStore;

const subscriber = () => {
    const latestState = store.getState();
    console.log(latestState);
}

store.subscribe(subscriber);

store.dispatch({type: 'increment'});
store.dispatch({type: 'increment'});
store.dispatch({type: 'increment'});
store.dispatch({type: 'decrement'});