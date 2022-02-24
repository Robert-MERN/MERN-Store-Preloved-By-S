import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: null,
    quantity: 0,
    total: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setProducts: (state, action)=>{
           if (state.products){
               const sameProduct = state.products.map((a)=> a._id === action.payload._id);
               const customSameProduct = sameProduct.filter((i)=> i === true);
               if(customSameProduct[0]){
                    const Action = action.payload
                    const similarProduct = state.products.filter((a)=> a._id === action.payload._id);
                    const expandedProduct = similarProduct[0];
                    const newProduct = [{...expandedProduct, ...Action, operate: ""}]
                    const otherProducts = state.products.filter((a)=> a._id !== action.payload._id)
                    const customData = [];
                    customData.unshift(newProduct[0], ...otherProducts);
                    state.products = customData.sort((a, b)=> {
                        return a.date - b.date;
                    });
                    state.quantity += 0;
                    if(action.payload.operate){
                        let remained = similarProduct[0].price * similarProduct[0].Quantity;
                        let writeState = state.total;
                        state.total -= remained;
                        if(writeState > state.total){
                            state.total += action.payload.price * action.payload.Quantity;
                        }
                    }
                } else {
                    const newData1 = [...state.products];
                    newData1.unshift(action.payload);
                    state.products = newData1.sort((a, b)=> {
                        return a.date - b.date;
                    });;
                    state.quantity += 1;
                    state.total += (action.payload.price * action.payload.Quantity); 
                }
            } else {
                const newData2 = [];
                newData2.unshift(action.payload);
                state.products = newData2.sort((a, b)=> {
                    return a.date - b.date;
                });;
                state.quantity += 1;
                state.total += (action.payload.price * action.payload.Quantity); 
            }
        },
        addTotal: (state, action) => {
                state.total += action.payload.price;
        },
        substractTotal: (state, action)=> {
            if(action.payload.QuantityCopy > 1){
                state.total -= action.payload.price;
            }
        },
        setReverse: (state, action)=> {
            state.products.splice(state.products.findIndex((i)=> i._id === action.payload._id), 1);
            state.total -= (action.payload.price * action.payload.Quantity);
            state.quantity -= 1;
        },
        removeCart: (state, action)=>{
            state.products = null;
            state.quantity = 0;
            state.total = 0;
        }
    }
});


export const { setProducts } = cartSlice.actions;
export const { setReverse } = cartSlice.actions;
export const { addTotal } = cartSlice.actions;
export const { substractTotal } = cartSlice.actions;
export const { removeCart } = cartSlice.actions;
export const selectProducts = (state)=> state.cart.products;  
export const selectQuantity = (state)=> state.cart.quantity;  
export const selectTotal = (state)=> state.cart.total;  
export const selectPopup = (state)=> state.cart.cartPopup;  
export default cartSlice.reducer;