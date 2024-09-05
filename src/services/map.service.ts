import axios from "axios";
import { IAddressResponse } from "../types/types";

class MapService {
  getByCoordinates(lat: number, lon: number) {
    return axios.get<IAddressResponse>(
      `https://geocode-maps.yandex.ru/1.x/?apikey=0380d9f2-7171-4b73-8c6c-e8d3afdbc666&geocode=${lon},${lat}&lang=ru&format=json`
    );
  }
}

export default new MapService();
