import AuthPage from "../pages/authPage/AuthPage";
import ConfirmTransfer from "../pages/confirmTransfer/ConfirmTransfer";
import HistoryPage from "../pages/historyPage/HistoryPage";
import MainPage from "../pages/mainPage/MainPage";
import PasswordPage from "../pages/passwordPage/PasswordPage";
import PaymentPage from "../pages/paymentPage/PaymentPage";
import PaymentsPage from "../pages/paymentsPage/PaymentsPage";
import QrPage from "../pages/qrPage/QrPage";
import TransferByPhone from "../pages/transferByPhone/TransferByPhone";
import TransferByPhoneTwo from "../pages/transferByPhoneTwo/TransferByPhoneTwo";

export const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/password", element: <PasswordPage /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/qr", element: <QrPage /> },
  { path: "/payments", element: <PaymentsPage /> },
  { path: "/history", element: <HistoryPage /> },
  { path: "/transfer-by-phone", element: <TransferByPhone /> },
  { path: "/transfer-by-phone2", element: <TransferByPhoneTwo /> },
  { path: "/confirm-transfer", element: <ConfirmTransfer /> },
  { path: "/payment", element: <PaymentPage /> },
];

export const pagesWithNavigation = ["", "payments", "services", "more"];
