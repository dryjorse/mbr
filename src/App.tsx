import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { pagesWithNavigation, routes } from "./constants/routes";
import Navigation from "./components/navigation/Navigation";

function App() {
  const pass = "999";
  const { pathname } = useLocation();

  useEffect(() => {
    let curr: string = "";

    while (curr !== pass) {
      curr = prompt("say my name") || "";
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {pagesWithNavigation.includes(pathname.slice(1)) && <Navigation />}
    </div>
  );
}

export default App;
