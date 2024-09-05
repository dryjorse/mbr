import { atom } from "jotai";
import { IPayment, PaymentStatusType } from "../types/types";

export const isUumarkOpenAtom = atom(false);
export const paymentAtom = atom<IPayment>({
  id: 0,
  type: "transfer",
  summ: 0,
  geolocation: "",
  receipt_number: "",
  is_success: true,
  created_at: new Date(),
});
export const isPasswordEnteredAtom = atom(false);
export const qrMessageAtom = atom("");
export const isAuthAtom = atom(false);
export const paymentStatusAtom = atom<PaymentStatusType>("success");
