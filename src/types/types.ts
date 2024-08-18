export type IType = "" | "tulpar";
export interface IPaymentType {
  name?: string;
  summ: number;
  phone?: number;
  type?: IType;
  transportCode?: number;
}
export interface IPaymentDateType {
  date: string;
  payments: IPaymentType[];
}
