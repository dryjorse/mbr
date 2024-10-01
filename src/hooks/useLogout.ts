import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { isAuthAtom } from "../store/store";

export const useLogout = () => {
  const [_, setIsAuth] = useAtom(isAuthAtom);

  return () => {
    Cookies.remove("mbr-refresh-token");
    localStorage.removeItem("mbr-access-token");
    setIsAuth(false);
  };
};
