export type IType = "transfer" | "tulpar" | "o-dengi";
export interface IPayment {
  id: number;
  type: IType;
  summ: number;
  geolocation: string;
  receipt_number: string;
  is_success: boolean;
  fullname?: string;
  phone?: number;
  transport_code?: number;
  created_at: Date;
  users: number[];
}
export interface IPaymentDate {
  date: string;
  payments: IPayment[];
}
export interface IProfile {
  id: number;
  username: string;
  email: string;
  phone: number;
  account: number;
  balance: number;
  payments: IPayment[];
}
export interface IAuthResponse {
  user: Omit<IProfile, "payments">;
  tokens: {
    access: string;
    refresh: string;
  };
}
export interface ILoginBody {
  email: string;
  password: string;
}
export interface IAddress {
  lat: number;
  lon: number;
}
export interface IAddressResponse {
  response: {
    GeoObjectCollection: {
      featureMember: [{ GeoObject: { name: string; description: string } }];
    };
  };
}
export type PaymentStatusType = "loading" | "success" | "error";
