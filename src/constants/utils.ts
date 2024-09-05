import Cookies from "js-cookie";

export const formatNumber = (number: number, isAddNull: boolean = true) => {
  let result;
  result =
    number < 10 && isAddNull
      ? "0" + number
      : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

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

export const capitalizeName = (name: string) => {
  name = name.toLowerCase();
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("mbr-access-token", accessToken);
  Cookies.set("mbr-refresh-token", refreshToken, { expires: 30 });
};

export const getCurrentMonth = () =>
  [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ][new Date().getMonth()];
