import { useAtom } from "jotai";
import { FC, PropsWithChildren } from "react";
import { isPasswordEnteredAtom } from "../../store/store";
import { Navigate, useLocation } from "react-router-dom";

const PasswordProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isPasswordEntered] = useAtom(isPasswordEnteredAtom);
  const { pathname } = useLocation();

  return children;

  return !isPasswordEntered && !pathname.match(/password/i) ? (
    <Navigate to="/password" />
  ) : (
    children
  );
};

export default PasswordProvider;
