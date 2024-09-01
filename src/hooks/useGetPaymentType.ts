import { useAtom } from "jotai";
import { IType } from "../types/types";
import { qrMessageAtom } from "../store/store";

export const useGetPaymentType = (): IType => {
  const [qrMessage] = useAtom(qrMessageAtom);

  return qrMessage.match(/tulpar/gi) ? "tulpar" : "";
};
