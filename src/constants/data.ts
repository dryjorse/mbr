import { IPaymentDateType } from "../types/types";

export const payments: IPaymentDateType[] = [
  {
    date: "Сегодня",
    payments: [{ summ: 150, name: "Улан К", phone: 220637742 }],
  },
  {
    date: "Вчера",
    payments: [
      { summ: 300, name: "Абдуннур А", phone: 228903050 },
      { summ: 75, name: "Эржан Ж", phone: 706309316 },
      { summ: 17, type: "tulpar" },
    ],
  },
  {
    date: "15.08.2024",
    payments: [
      { summ: 560, name: "Наргуль Б", phone: 505851080 },
      { summ: 17, type: "tulpar" },
      { summ: 90, name: "Динара А", phone: 702070705 },
    ],
  },
  {
    date: "14.08.2024",
    payments: [
      { summ: 400, name: "Адилет М", phone: 502822053 },
      { summ: 100, name: "Рыспек Б", phone: 550808813 },
      { summ: 90, name: "Чолпон У", phone: 704138168 },
      { summ: 300, name: "Элзат Н", phone: 508066091 },
      { summ: 70, name: "Айазада Ж", phone: 999591994 },
    ],
  },
];

export const contacts = [
  { name: "Дунду", tel: 228903050, fullname: "Абдуннур А." },
  { name: "Жума", tel: 706309316, fullname: "Эржан Ж." },
];
