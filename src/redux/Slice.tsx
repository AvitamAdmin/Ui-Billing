import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
  _id: string;
  productName: string;
  purchasePrice: string;
  sellingPrice: string;
  image: string;
  count: number;
  quantity: string;
  bag: string;
};

interface UserState {
  name?: string;
  fetchCustomerFromBill: Product[];
}

const initialState: UserState = {
  fetchCustomerFromBill: [],
  name: "",
};

const userSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    addCustomerNameToBill(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    restCustomerBill(state, action: PayloadAction<string>){
      state.fetchCustomerFromBill = [];
    },
    addCustomerToBill(state, action: PayloadAction<Product>) {
      state.fetchCustomerFromBill.push(action.payload);
    },
    removeCustomerFromBill(state, action: PayloadAction<string>) {
      state.fetchCustomerFromBill = state.fetchCustomerFromBill.filter(product => product._id !== action.payload);
    }
  },
});

export const { addCustomerNameToBill, addCustomerToBill, removeCustomerFromBill, restCustomerBill } = userSlice.actions;

export default userSlice.reducer;
