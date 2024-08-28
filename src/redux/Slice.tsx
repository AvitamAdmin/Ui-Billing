import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
  _id: string;
  productName: string;
  purchasePrice: string;
  sellingPrice: string;
  image: string; // Assuming image is now a base64 string
  count: number; // Add count property
  bag1: string;
  quantity1: string; 
  bag2: string;
  quantity2: string;
  productPrice: number;
};
type Customer = {
  _id: string;
  customerName: string;
  address: string;
  mobileNumber: string;
  creator: string;
  creationTime: string;
  lastModified: string;
  __v: number;
  pendingAmount : string
};
interface UserState {
  name?: string;
  fetchCustomerFromBill: Product[];
  fetchPendingAmount: string;
}

const initialState: UserState = {
  fetchCustomerFromBill: [],
  fetchPendingAmount: "",
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
    },
    GetPendingAmount(state, action: PayloadAction<string>){
      state.fetchPendingAmount = action.payload;
    },
  },
});

export const { addCustomerNameToBill, addCustomerToBill, removeCustomerFromBill, restCustomerBill,GetPendingAmount } = userSlice.actions;

export default userSlice.reducer;
