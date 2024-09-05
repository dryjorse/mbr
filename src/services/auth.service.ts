import { $api, $apiPrivate, apiConfig } from "../constants/api";
import { IAuthResponse, ILoginBody, IProfile } from "../types/types";

class AuthService {
  getProfile() {
    return $apiPrivate<IProfile>(apiConfig.Profile);
  }
  login(data: ILoginBody) {
    return $api.post<IAuthResponse>(apiConfig.Login, data);
  }
  refresh(refresh: string) {
    return $api.post(apiConfig.Refresh, { refresh });
  }
}

export default new AuthService();
