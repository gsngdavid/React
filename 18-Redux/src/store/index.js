import { configureStore } from "@reduxjs/toolkit"

import counterRethReducducer from './counter';
import auer from './auth';

const store = configureStore({
    reducer: {
        counterObj: counterReducer,
        authObj: authReducer
    }
});

export default store;

