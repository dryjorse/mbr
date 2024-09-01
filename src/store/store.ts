import { atom } from "jotai";
import { IPayment, IPaymentDate } from "../types/types";
import { payments } from "../constants/data";

export const paymentsAtom = atom<IPaymentDate[]>(payments);
export const paymentAtom = atom<IPayment>({ summ: 0 });
export const balanceAtom = atom(13407);
export const isPasswordEnteredAtom = atom(false);
export const qrMessageAtom = atom("");
