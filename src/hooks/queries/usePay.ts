import { useAtom } from "jotai";
import { paymentAtom, paymentStatusAtom } from "../../store/store";
import { useEffect, useState } from "react";
import { IAddress } from "../../types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import paymentsService from "../../services/payments.service";
import { queryKeys } from "../../constants/api";
import mapService from "../../services/map.service";

export const usePay = () => {
  const queryClient = useQueryClient();
  const [payment, setPayment] = useAtom(paymentAtom);
  const [_, setPaymentStatus] = useAtom(paymentStatusAtom);
  const [location, setLocation] = useState<Omit<IAddress, "display_name">>({
    lat: 0,
    lon: 0,
  });

  const { mutate: pay } = useMutation({
    mutationFn: paymentsService.pay,
    onMutate: () => {},
    onSuccess: ({ data: payment }) => {
      setPayment({ ...payment, summ: +payment.summ });
      setPaymentStatus("success");
      queryClient.prefetchQuery({ queryKey: [queryKeys.Profile] });
    },
    onError: () => {
      setPaymentStatus("error");
      setPayment({ ...payment, is_success: false });
    },
  });

  const { data: address } = useQuery({
    queryKey: [queryKeys.Map],
    queryFn: () => mapService.getByCoordinates(location.lat, location.lon),
    select: ({ data }) => data,
    enabled: !!location.lat && !!location.lon,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    setPaymentStatus("loading");

    if (location.lat && location.lon && address) {
      const geoObject =
        address?.response.GeoObjectCollection.featureMember[0].GeoObject;

      pay({
        ...payment,
        geolocation: geoObject
          ? `${geoObject.name} ${geoObject.description} ${location.lon} ${location.lat}`
          : "Неизвестно",
      });
    } else if (!location.lat && !location.lon) {
      pay({
        ...payment,
        geolocation: "Неизвестно",
      });
    }
  }, [address, location]);
};
