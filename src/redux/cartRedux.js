import { createSlice } from '@reduxjs/toolkit'

export const cartSclice = createSlice({
    name: 'cart',
  initialState:{
    product:[],
    quantity:0,
    total:0,
    color:"",
    size:"",
  },
  reducers:{
    addProduct:(state,action)=>{
        state.quantity+=1;
        state.product.push(action.payload);
        state.total+=action.payload.price * action.payload.quantity;
        state.color=action.payload.color;
        state.size=action.payload.size;

    }
  }
})

export const { addProduct } = cartSclice.actions

export default cartSclice.reducer