import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../REDUX/userLoginSlice';
import adminReducer from '../REDUX/adminLoginSlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer
    }
})

export default store