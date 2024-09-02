import { IType } from "../types/types";

export const formatNumber = (number: number, isAddNull: boolean = true) => {
  let result;
  result =
    number < 10 && isAddNull
      ? "0" + number
      : number >= 1000
      ? `${(number + "").slice(0, (number + "").length - 3)} ${(
          number + ""
        ).slice(-3)}`
      : number;

  return result;
};

export const randomInteger = (min: number, max: number) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const formatPhone = (phone: number) => {
  const phoneString = phone + "";

  return `(${phoneString.slice(0, 3)}) ${phoneString.slice(3, 5)}-${(
    phone + ""
  ).slice(5, 7)}-${phoneString.slice(7, 9)}`;
};

export const getType = (qrMessage: string): IType => {
  return qrMessage.match(/tulpar/i) ? "tulpar" : "";
};

export const capitalizeName = (name: string) => {
  name = name.toLowerCase();
  return name.charAt(0).toUpperCase() + name.slice(1);
};
