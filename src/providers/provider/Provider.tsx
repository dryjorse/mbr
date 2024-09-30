import { useAtom } from "jotai";
import { FC, PropsWithChildren } from "react";
import { isAuthAtom, isPasswordEnteredAtom } from "../../store/store";
import { Navigate, useLocation } from "react-router-dom";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth] = useAtom(isAuthAtom);
  const [isPasswordEntered] = useAtom(isPasswordEnteredAtom);
  const { pathname } = useLocation();

  return !isAuth && !pathname.match(/auth/i) ? (
    <Navigate to="/auth" />
  ) : !isPasswordEntered &&
    !pathname.match(/password/i) &&
    !pathname.match(/auth/i) ? (
    <Navigate to="/password" />
  ) : (
    children
  );
};

export default Provider;
