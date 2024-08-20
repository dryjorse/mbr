import HistoryPage from "../pages/historyPage/HistoryPage";
import MainPage from "../pages/mainPage/MainPage";
import PaymentsPage from "../pages/paymentsPage/PaymentsPage";

export const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/payments", element: <PaymentsPage /> },
  { path: "/history", element: <HistoryPage /> },
];

export const pagesWithNavigation = ["", "payments", "services", "more"];
