import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/api";
import authService from "../../services/auth.service";
import { useAtom } from "jotai";
import { isAuthAtom } from "../../store/store";

export const useProfile = () => {
  const [isAuth] = useAtom(isAuthAtom);

  return useQuery({
    queryKey: [queryKeys.Profile],
    queryFn: () => authService.getProfile(),
    select: ({ data }) => data,
    enabled: !!isAuth,
  });
};
