import { useAtom } from "jotai";
import { FC, PropsWithChildren } from "react";
import {
  isAuthAtom,
  isClosedAtom,
  isPasswordEnteredAtom,
} from "../../store/store";
import { Navigate, useLocation } from "react-router-dom";
import { useProfile } from "../../hooks/queries/useProfile";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth] = useAtom(isAuthAtom);
  const [isPasswordEntered] = useAtom(isPasswordEnteredAtom);
  const [isClosed] = useAtom(isClosedAtom);
  const { data } = useProfile();
  const { pathname } = useLocation();

  console.log(data?.email !== "user@gmail.com");

  return children;

  return !isAuth && !pathname.match(/auth/i) ? (
    <Navigate to="/auth" />
  ) : isClosed &&
    !pathname.match(/closed/i) &&
    !pathname.match(/history/i) &&
    !pathname.match(/auth/i) &&
    data?.email !== "user@gmail.com" ? (
    <Navigate to="/closed" />
  ) : isClosed &&
    (pathname.match(/history/i) || pathname.match(/auth/i)) &&
    data?.email !== "user@gmail.com" ? (
    children
  ) : !isPasswordEntered &&
    !pathname.match(/password/i) &&
    !pathname.match(/auth/i) &&
    (!isClosed || data?.email === "user@gmail.com") ? (
    <Navigate to="/password" />
  ) : (
    children
  );
};

export default Provider;
