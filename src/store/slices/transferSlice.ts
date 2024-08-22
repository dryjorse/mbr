import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  phone: number;
  name: string;
  summ: number;
  balance: number;
}

const initialState: State = {
  phone: 0,
  name: "",
  summ: 0,
  balance: 10543,
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
  },
});

export default transferSlice.reducer;
export const { setPhone, setName, setSumm } = transferSlice.actions;
