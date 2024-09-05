import { $apiPrivate, apiConfig } from "../constants/api";
import { IPayment } from "../types/types";

class PaymentsService {
  pay(payment: IPayment) {
    return $apiPrivate.post<IPayment>(apiConfig.Pay, payment);
  }
  toggleStatus({ id, is_success }: { id: number; is_success: boolean }) {
    return $apiPrivate.patch<IPayment>(`${apiConfig.Payments}${id}/`, {
      is_success,
    });
  }
}

export default new PaymentsService();
