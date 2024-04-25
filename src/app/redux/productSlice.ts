import { createSlice } from "@reduxjs/toolkit";
import { dataTable } from "../dataTable";

// export interface data {
//     name: string;
//     description:string;
//     price:number;
//     quantity:number;
// }
const initialState ={
    data:dataTable
}
export const ProductSlice = createSlice({
    name: "product_slice",
    initialState,
    reducers: {
      deleteProduct: (state, action) => {
        console.log('action',action.payload)
        state.data = state.data.filter(product => product.id !== action.payload);
      },
      addProduct: (state, action) => {
        state.data = [...state.data, action.payload];
      },
      ediProduct:(state,action)=>{
        const editedProductIndex = state.data.findIndex(product => product.id === action.payload.id);
            if (editedProductIndex !== -1) {
                state.data[editedProductIndex] = action.payload;
            }
      }
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { addProduct,deleteProduct,ediProduct } = ProductSlice.actions;
  
  export default ProductSlice.reducer;