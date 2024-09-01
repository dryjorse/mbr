import { Route, Routes, useLocation } from "react-router-dom";
import { pagesWithNavigation, routes } from "./constants/routes";
import Navigation from "./components/navigation/Navigation";
import clsx from "clsx";
import PasswordProvider from "./providers/passwordProvider/PasswordProvider";

function App() {
  const { pathname } = useLocation();
  const isWithNavigation = pagesWithNavigation.includes(pathname.slice(1));

  return (
    <div className={clsx("App", { "pb-[78px]": isWithNavigation })}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<PasswordProvider>{route.element}</PasswordProvider>}
          />
        ))}
      </Routes>
      {isWithNavigation && <Navigation />}
    </div>
  );
}

export default App;
