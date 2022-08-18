import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  order: localStorage.getItem("order")
    ? JSON.parse(localStorage.getItem("order"))
    : [],
  amount: 0,
  total: 0,
  ordered: false,
  admin: false,
  valuecart: localStorage.getItem("address")
    ? JSON.parse(localStorage.getItem("address"))
    : [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const itemIndex = state.value.findIndex(
        (item) => item._id === action.payload.id
      );
      if (itemIndex >= 0) {
        const cart = state.value.find((ele) => ele._id === action.payload.id);
        if(action.payload.stock < cart.quantity+1){
            return;
        }
        else{
        cart.quantity = cart.quantity + 1;
        }
      } 
      else {
        state.value.push(action.payload.product);
        state.order.push(action.payload.product);
      }
      localStorage.setItem("cart", JSON.stringify(state.value));
      localStorage.setItem("order", JSON.stringify(state.value));
    },
    remove: (state, action) => {
      state.value = state.value.filter(
        (product) => product._id !== action.payload
      );
    },
    inc: (state, action) => {
      if (action.payload.stock === action.payload.quantity)
        return localStorage.setItem("stock", "true");
      else {
        const cart = state.value.find((ele) => ele._id === action.payload._id);
        cart.quantity = cart.quantity + 1;
      }
    },
    dec: (state, action) => {
      const cart = state.value.find((ele) => ele._id === action.payload);
      cart.quantity = cart.quantity - 1;
    },
    clearCart: (state) => {
      state.value = [];
    },
    calcTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.value.forEach((ele) => {
        amount += ele.quantity;
        total += ele.quantity * ele.price;
      });
      state.amount = amount;
      state.total = total;
    },
    setadmin: (state) => {
      state.admin = true;
    },
    addaddr: (state, action) => {
      state.valuecart.push(action.payload);
      localStorage.setItem("address", JSON.stringify(state.valuecart));
    },
    ordered: (state) => {
      state.ordered = true;
    },
  },
});
export const {
  inc,
  dec,
  add,
  remove,
  clearCart,
  calcTotal,
  setadmin,
  addcart,
  addaddr,
  ordered,
} = cartSlice.actions;
export default cartSlice.reducer;
