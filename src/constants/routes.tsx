import ConfirmTransfer from "../pages/confirmTransfer/ConfirmTransfer";
import HistoryPage from "../pages/historyPage/HistoryPage";
import MainPage from "../pages/mainPage/MainPage";
import PaymentPage from "../pages/paymentPage/PaymentPage";
import PaymentsPage from "../pages/paymentsPage/PaymentsPage";
import TransferByPhone from "../pages/transferByPhone/TransferByPhone";
import TransferByPhoneTwo from "../pages/transferByPhoneTwo/TransferByPhoneTwo";

export const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/payments", element: <PaymentsPage /> },
  { path: "/history", element: <HistoryPage /> },
  { path: "/transfer-by-phone", element: <TransferByPhone /> },
  { path: "/transfer-by-phone2", element: <TransferByPhoneTwo /> },
  { path: "/confirm-transfer", element: <ConfirmTransfer /> },
  { path: "/payment", element: <PaymentPage /> },
];

export const pagesWithNavigation = ["", "payments", "services", "more"];
