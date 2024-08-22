import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { pagesWithNavigation, routes } from "./constants/routes";
import Navigation from "./components/navigation/Navigation";
import clsx from "clsx";

function App() {
  const pass = "999";
  const { pathname } = useLocation();
  const isWithNavigation = pagesWithNavigation.includes(pathname.slice(1));

  useEffect(() => {
    let curr: string = "";

    while (curr !== pass) {
      curr = prompt("say my name") || "";
    }
  }, []);

  return (
    <div className={clsx("App", { "pb-[78px]": isWithNavigation })}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {isWithNavigation && <Navigation />}
    </div>
  );
}

export default App;
