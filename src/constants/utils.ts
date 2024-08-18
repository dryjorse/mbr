export const formatNumber = (number: number) => {
  let result;
  result =
    number < 10
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
