import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaymentDateType } from "../../types/types";
import { payments } from "../../constants/data";

interface State {
  phone: number;
  name: string;
  summ: number;
  balance: number;
  payments: IPaymentDateType[];
}

const initialState: State = {
  phone: 0,
  name: "",
  summ: 0,
  balance: 10543,
  payments,
};

const transferSlice = createSlice({
  name: "transferSlice",
  initialState,
  reducers: {
    setPhone(state, action: PayloadAction<number>) {
      console.log(action.payload);
      if ((action.payload + "").length < 10) state.phone = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setSumm(state, action: PayloadAction<number>) {
      state.summ = action.payload;
    },
    setPayments(state, action: PayloadAction<IPaymentDateType[]>) {
      state.payments = action.payload;
    },
  },
});

export default transferSlice.reducer;
export const { setPhone, setName, setSumm, setPayments } =
  transferSlice.actions;
