import { IPayment } from "../types/types";

interface ICustomPayment extends Omit<IPayment, "summ"> {
  summ: string;
}

export const password = 9999;

export const paymentsData: ICustomPayment[] = [
  {
    id: 0,
    type: "transfer",
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "150.00",
    fullname: "Улан К.",
    phone: 220637742,
  },
  {
    id: 0,
    type: "transfer",
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "300.00",
    fullname: "Абдуннур А.",
    phone: 228903050,
  },
  {
    id: 0,
    type: "transfer",
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "75.00",
    fullname: "Эржан Ж.",
    phone: 706309316,
  },
  {
    id: 0,
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "17.00",
    type: "tulpar",
    transport_code: 1517,
  },
  {
    id: 0,
    type: "transfer",
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "560.00",
    fullname: "Наргуль Б.",
    phone: 505851080,
  },
  {
    id: 0,
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "17.00",
    type: "tulpar",
    transport_code: 1517,
  },
  {
    id: 0,
    type: "transfer",
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "90.00",
    fullname: "Динара А.",
    phone: 702070705,
  },
  {
    id: 0,
    type: "transfer",
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "400.00",
    fullname: "Адилет М.",
    phone: 502822053,
  },
  {
    id: 0,
    type: "transfer",
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "100.00",
    fullname: "Рыспек Б.",
    phone: 550808813,
  },
  {
    id: 0,
    type: "transfer",
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "90.00",
    fullname: "Чолпон У.",
    phone: 704138168,
  },
  {
    id: 0,
    type: "transfer",
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "300.00",
    fullname: "Элзат Н.",
    phone: 508066091,
  },
  {
    id: 0,
    type: "transfer",
    geolocation: "",
    receipt_number: "Р0902165728304",
    is_success: true,
    created_at: new Date(),
    summ: "70.00",
    fullname: "Айазада Ж.",
    phone: 999591994,
  },
];

export const contacts = [
  { name: "Дунду", tel: 228903050, fullname: "Абдуннур А." },
  { name: "Жума", tel: 706309316, fullname: "Эржан Ж." },
];
