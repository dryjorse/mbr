import { Route, Routes, useLocation } from "react-router-dom";
import { pagesWithNavigation, routes } from "./constants/routes";
import Navigation from "./components/navigation/Navigation";
import clsx from "clsx";
import Provider from "./providers/provider/Provider";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import authService from "./services/auth.service";
import { useAtom } from "jotai";
import { isAuthAtom } from "./store/store";
import Cookies from "js-cookie";
import mbankWelcomeImage from "./assets/images/mbank-welcome.jpg";
import { useProfile } from "./hooks/queries/useProfile";
import Uumark from "./components/uumark/Uumark";

function App() {
  const { pathname } = useLocation();
  const [isAuth, setIsAuth] = useAtom(isAuthAtom);
  const [isLoading, setIsLoading] = useState(true);
  const isWithNavigation = pagesWithNavigation.includes(pathname.slice(1));

  const { mutate: refresh, isPending } = useMutation({
    mutationFn: authService.refresh,
    onSuccess: ({ data }) => {
      localStorage.setItem("mbr-access-token", data.access);
      setIsAuth(true);
    },
    onSettled: () => setIsLoading(false),
  });

  const { isPending: isProfileLoading } = useProfile();

  useEffect(() => {
    const refreshToken = Cookies.get("mbr-refresh-token");

    if (refreshToken) {
      refresh(refreshToken);
    } else setIsLoading(false);
  }, []);

  if (isLoading || isPending || (isProfileLoading && isAuth))
    return (
      <img
        src={mbankWelcomeImage}
        alt="mbank-welcome"
        className="w-full h-screen"
      />
    );

  return (
    <div className={clsx("App", { "pb-[78px]": isWithNavigation })}>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<Provider>{route.element}</Provider>}
          />
        ))}
      </Routes>
      <Uumark />
      {isWithNavigation && <Navigation />}
    </div>
  );
}

export default App;
