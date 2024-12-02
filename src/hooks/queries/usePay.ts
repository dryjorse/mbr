import { useAtom } from "jotai";
import { isExtrAtom, paymentAtom, paymentStatusAtom } from "../../store/store";
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
  const [isExtra] = useAtom(isExtrAtom);
  const [location, setLocation] = useState<Omit<IAddress, "display_name">>({
    lat: 0,
    lon: 0,
  });

  useEffect(() => {
    setPaymentStatus("success");
  }, [isExtra]);

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

  const { data: address, isFetched } = useQuery({
    queryKey: [queryKeys.Map],
    queryFn: () => mapService.getByCoordinates(location.lat, location.lon),
    select: ({ data }) => data,
    enabled: !!location.lat && !!location.lon,
  });

  useEffect(() => {
    !isExtra && setPaymentStatus("loading");

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
    if (isFetched) {
      const geoObject =
        address?.response.GeoObjectCollection.featureMember[0].GeoObject;

      pay({
        ...payment,
        geolocation: geoObject
          ? `${geoObject.name} ${geoObject.description} ${location.lon} ${location.lat}`
          : "Неизвестно",
      });
    }
  }, [isFetched]);
};
