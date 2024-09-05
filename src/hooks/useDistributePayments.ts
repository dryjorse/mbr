import { paymentsData } from "../constants/data";
import { IPayment, IPaymentDate } from "../types/types";

export const useDistributePayments = (payments: IPayment[]) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Шаг 1: Группировка настоящих платежей по дате
  const groupedPayments: IPaymentDate[] = payments.reduce<IPaymentDate[]>(
    (acc, item) => {
      const date = formatDate(new Date(item.created_at!));
      const existing = acc.find((el) => el.date === date);

      if (existing) {
        existing.payments.push(item);
      } else {
        acc.push({
          date,
          payments: [item],
        });
      }

      return acc;
    },
    []
  );

  // Шаг 2: Добавление ложных платежей

  const lastRealDate = payments[payments.length - 1]?.created_at
    ? new Date(payments[payments.length - 1]?.created_at)
    : new Date();

  const yesterday = new Date(lastRealDate);
  yesterday.setDate(lastRealDate.getDate() - 1);
  const twoDaysAgo = new Date(lastRealDate);
  twoDaysAgo.setDate(lastRealDate.getDate() - 2);
  const threeDaysAgo = new Date(lastRealDate);
  threeDaysAgo.setDate(lastRealDate.getDate() - 3);

  groupedPayments.push({
    date: formatDate(yesterday),
    payments: paymentsData
      .map((payment) => ({ ...payment, created_at: yesterday }))
      .slice(0, 4),
  });
  groupedPayments.push({
    date: formatDate(twoDaysAgo),
    payments: paymentsData
      .map((payment) => ({ ...payment, created_at: twoDaysAgo }))
      .slice(4, 8),
  });
  groupedPayments.push({
    date: formatDate(threeDaysAgo),
    payments: paymentsData
      .map((payment) => ({ ...payment, created_at: threeDaysAgo }))
      .slice(8, 12),
  });

  const today = new Date();
  const yesterdayDate = new Date(today);
  yesterdayDate.setDate(today.getDate() - 1);

  const updatedGroupedPayments = groupedPayments.map((item) => {
    if (item.date === formatDate(today)) {
      return { ...item, date: "Сегодня" };
    } else if (item.date === formatDate(yesterdayDate)) {
      return { ...item, date: "Вчера" };
    }
    return item;
  });

  return updatedGroupedPayments;
};
