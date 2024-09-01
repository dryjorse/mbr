export type IType = "" | "tulpar";
export interface IPayment {
  name?: string;
  summ: number;
  phone?: number;
  type?: IType;
  transportCode?: number;
}
export interface IPaymentDate {
  date: string;
  payments: IPayment[];
}
