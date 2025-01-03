import { FC, useState } from "react";
import { formatNumber } from "../../constants/utils";
import clsx from "clsx";
import { useAtom } from "jotai";
import {
  isClosedAtom,
  isExtrAtom,
  isUumarkOpenAtom,
  paymentAtom,
  paymentStatusAtom,
} from "../../store/store";
import { useProfile } from "../../hooks/queries/useProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import paymentsService from "../../services/payments.service";
import logoIcon from "../../assets/images/icons/logo.webp";
import crossIcon from "../../assets/images/icons/cross.svg";
import markIcon from "../../assets/images/icons/mark.svg";
import borderIcon from "../../assets/images/icons/border.svg";
import taskIcon from "../../assets/images/icons/task.svg";
import repeatIcon from "../../assets/images/icons/repeat.svg";
import favouriteIcon from "../../assets/images/icons/favourite.svg";
import clockIcon from "../../assets/images/icons/clock.svg";
import errorIcon from "../../assets/images/icons/error.svg";
import { queryKeys } from "../../constants/api";

const Uumark: FC = () => {
  const [isExtra] = useAtom(isExtrAtom);
  const queryClient = useQueryClient();
  const { data: profile } = useProfile();
  const [isOpen, setIsOpen] = useAtom(isUumarkOpenAtom);
  const [payment, setPayment] = useAtom(paymentAtom);
  const [status, setStatus] = useAtom(paymentStatusAtom);
  const [isClosed] = useAtom(isClosedAtom);
  const [statusClicks, setStatusClicks] = useState(0);

  const { mutate: toggleStatus, isPending } = useMutation({
    mutationFn: paymentsService.toggleStatus,
    onMutate: () => {
      !isExtra && setStatus("loading");
    },
    onSuccess: ({ data }) => {
      setPayment(data);
      setStatus(isExtra ? "success" : data.is_success ? "success" : "error");
      queryClient.prefetchQuery({ queryKey: [queryKeys.Profile] });
    },
  });

  const onClickStatus = () => {
    if (!isClosed) {
      if (statusClicks >= 3) {
        setStatusClicks(0);
        if (isExtra) {
          setStatus("error");
        } else {
          toggleStatus({ id: payment.id, is_success: !payment.is_success });
        }
      } else {
        setStatusClicks((prev) => prev + 1);
      }
    }
  };

  const formatDate = (dateStr: Date) => {
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  const padZero = (num: number) => (num < 10 ? `0${num}` : num);

  const now = new Date();

  const year = now.getFullYear();
  const month = padZero(now.getMonth() + 1); // Месяцы начинаются с 0
  const day = padZero(now.getDate());

  const hours = padZero(now.getHours());
  const minutes = padZero(now.getMinutes());
  const seconds = padZero(now.getSeconds());

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  function formatNum(num: number) {
    const [integer, decimal] = num.toString().split(".");
    const formattedDecimal = (decimal || "00").padStart(2, "0").slice(0, 2);
    return `${integer},${formattedDecimal}`;
  }

  const summ: number = isClosed
    ? +(+payment.summ / (payment.users?.length || 1)).toFixed(2)
    : +payment.summ;

  return (
    <div
      className={clsx(
        "fixed top-0 bottom-0 left-0 right-0 px-[7px] flex justify-center items-center flex-col trans-def z-50",
        { "opacity-0 pointer-events-none": !isOpen }
      )}
    >
      <div className="rounded-[24px] p-20 w-full bg-gray">
        <div className="flex justify-between items-center">
          <img src={logoIcon} alt="logo" className="w-[80px]" />

          <button onClick={() => setIsOpen(false)}>
            <img src={crossIcon} alt="cross" className="w-[26px]" />
          </button>
        </div>
        <button
          disabled={isPending}
          onClick={onClickStatus}
          className="mt-30 mb-20 mx-auto block"
        >
          <img
            alt="mark"
            src={
              isExtra
                ? markIcon
                : status === "loading"
                ? clockIcon
                : payment.is_success
                ? markIcon
                : errorIcon
            }
            className=" w-[65px]"
          />
        </button>
        <h1
          className={clsx("text-[21px] text-center text-green", {
            "!text-orange": status === "loading" && !isExtra,
            "!text-red": !payment.is_success && !isExtra,
          })}
        >
          {isExtra
            ? "Транзакция успешно проведена"
            : status === "loading"
            ? "Платеж в обработке"
            : payment.is_success
            ? "Транзакция успешно проведена"
            : "Платеж отклонен"}
        </h1>
        <h2 className="mt-10 text-[24px] text-center flex justify-center items-center">
          -{" "}
          {payment.type === "o-dengi" ? (
            // @ts-ignore
            formatNumber(formatNum(summ + (summ * 1) / 100))
          ) : (
            // @ts-ignore
            <>{formatNumber(formatNum(summ))} </>
          )}
          <span className="block underline text-[21px] ml-[6px] font-black">
            C
          </span>
        </h2>
        <h3 className="text-center text-grey text-[17px]">
          {payment.type === "tulpar"
            ? "Тулпар - оплата за проезд"
            : payment.type === "o-dengi" || payment.fullname === "Global"
            ? "Оплата по QR"
            : "Перевод по номеру телефона"}
        </h3>
        <img src={borderIcon} alt="border" className="w-full my-10" />
        <div className="my-[7px] flex justify-between items-center text-[15px]">
          <span className="text-grey">Имя получателя</span>
          <span
            className={clsx("text-end flex-[0_1_200px]", {
              "flex-[0_1_150px]": payment.type === "o-dengi",
            })}
          >
            {payment.type === "tulpar"
              ? "CASH OUT ТУЛПАР ОПЛАТА ЗА ПРОЕЗД"
              : payment.type === "o-dengi"
              ? "ОПЛАТА ПО ЕДИНОМУ QR (КЭШАУТ) МПЦ"
              : payment.fullname}
          </span>
        </div>
        <div className="my-[7px] flex justify-between text-[15px]">
          <span className="text-grey">Оплачено со счета</span>
          <span>{isExtra ? "1030120546212794" : profile?.account}</span>
        </div>
        {payment.type === "o-dengi" && (
          <div className="my-[7px] flex justify-between text-[15px]">
            <span className="text-grey">Комиссия</span>
            <span>
              {formatNum(0 + (payment.summ * 1) / 100)}
              <span className="som uppercase ml-[5px] font-normal">c</span>
            </span>
          </div>
        )}
        <div className="my-[7px] flex justify-between text-[15px]">
          <span className="text-grey">Дата операции</span>
          <span>{formatDate(payment.created_at)}</span>
        </div>
        {status !== "loading" && (
          <div className="my-[7px] flex justify-between text-[15px]">
            <span className="text-grey">Номер квитанции</span>
            <span>{isExtra ? "P1128133506237" : payment.receipt_number}</span>
          </div>
        )}
        {payment.type === "o-dengi" && (
          <div className="my-[7px] flex justify-between text-[15px]">
            <span className="text-grey">Получатель</span>
            <span>{payment.fullname}.</span>
          </div>
        )}
        {payment.type === "tulpar" && (
          <div className="my-[10px] flex justify-between text-[15px]">
            <span className="text-grey">Код транспорта</span>
            <span>{payment.transport_code}</span>
          </div>
        )}
        <img src={borderIcon} alt="border" className="w-full my-10" />
        <p className="text-start text-[15px] text-grey">
          {payment.type === "tulpar" ? (
            `Оплата услуг: Получатель: Тулпар - оплата за проезд. ${payment.transport_code}/${payment.summ}.00`
          ) : payment.fullname === "Global" ? (
            <>
              QR/Global/{formattedDate}/<br />
              MKSA_S_c115b5b9-fa0e-406e-9bb9-e67fe48d0470/QR_452
            </>
          ) : payment.type === "o-dengi" ? (
            `Оплата услуг. Получатель: Перевод по QR. SQBDbFFkOykyt60rRve5MGLAyhDcC70f/
          996${payment.phone}/O!Den'gi - ${payment.fullname}./${payment.summ}`
          ) : (
            <>
              Перевод по номеру телефона. 996{payment.phone}/
              <br />
              {payment.fullname?.replace(/\./g, "")}./ /
            </>
          )}{" "}
          {payment.fullname !== "Global" && (
            <>
              Сумма <span className="summ">{formatNumber(+payment.summ)}</span>
              .00 KGS
            </>
          )}
        </p>
      </div>
      <div className="mt-30 px-10 w-full flex justify-between items-start leading-[21px]">
        <button className="max-w-[100px]">
          <img
            src={taskIcon}
            alt="task"
            className="mx-auto mb-[5px] rounded-[20px] w-[40px]"
          />
          <span>Отправить</span>
        </button>
        <button className="max-w-[100px]">
          <img
            src={repeatIcon}
            alt="task"
            className="mx-auto mb-[5px] rounded-[20px] w-[40px]"
          />
          <span>Повторить платеж</span>
        </button>
        <button className="max-w-[100px]">
          <img
            src={favouriteIcon}
            alt="task"
            className="mx-auto mb-[5px] rounded-[20px] w-[40px]"
          />
          <span>Создать шаблон</span>
        </button>
      </div>
    </div>
  );
};

export default Uumark;
