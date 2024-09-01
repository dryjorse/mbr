import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatNumber, formatPhone } from "../../constants/utils";
import { useAtom } from "jotai";
import {
  balanceAtom,
  paymentAtom,
  paymentsAtom,
  qrMessageAtom,
} from "../../store/store";
import { useGetPaymentType } from "../../hooks/useGetPaymentType";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import somIcon from "../../assets/images/icons/som.svg";
import arrowDownIcon from "../../assets/images/icons/arrow-down.svg";
import profileIcon from "../../assets/images/icons/profile.svg";
import infoIcon from "../../assets/images/icons/info.svg";
import tulparIcon from "../../assets/images/icons/tulpar.svg";
import clsx from "clsx";

const ConfirmTransfer: FC = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useAtom(paymentAtom);
  const [payments, setPayments] = useAtom(paymentsAtom);
  const [balance] = useAtom(balanceAtom);
  const [qrMessage] = useAtom(qrMessageAtom);
  const paymentType = useGetPaymentType();

  const transportCode = qrMessage.replace(/tulpar/i, "");

  const onClickConfirm = () => {
    setPayment({
      ...payment,
      type: paymentType,
      transportCode: +transportCode,
    });

    setPayments([
      {
        date: "Сегодня",
        payments: [
          {
            name: payment.name,
            summ: payment.summ,
            phone: payment.phone,
            transportCode: +transportCode,
            type: paymentType,
          },
          ...(payments.find(({ date }) => date === "Сегодня")?.payments || []),
        ],
      },
      ...payments.filter(({ date }) => date !== "Сегодня"),
    ]);
  };

  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-[30px]">
          <button onClick={() => navigate(-1)}>
            <img src={arrowIcon} alt="arrow" className="w-[15px]" />
          </button>
          <h1 className="text-[16px]">
            Подтвердждение {paymentType === "tulpar" ? "платежа" : "перевода"}
          </h1>
        </div>
        <div className="relative mt-20 mb-[15px] rounded-[18px] p-[15px] flex gap-[13px] items-center bg-gray">
          <img src={somIcon} alt="som" className="w-[40px]" />
          <div className="flex flex-col text-grey">
            <span>
              <span className="text-[50px] leading-[0px] tracking-[-3px]">
                ..
              </span>
              2563
            </span>
            <span className="font-bold text-[17px]">
              <span className="text-white">{formatNumber(balance, false)}</span>
              ,00 <span className="som text-[15px]">C</span>
            </span>
          </div>
          {paymentType === "" && (
            <div className="absolute left-[50%] bottom-[-20px] translate-x-[-50%] rounded-circle border border-black bg-gray w-[30px] h-[30px] flex justify-center items-center">
              <img src={arrowDownIcon} alt="arrow-down" className="w-[10px]" />
            </div>
          )}
        </div>
        <div className="rounded-[18px] p-[15px] bg-gray flex justify-between items-center">
          <div className="flex gap-[13px] items-center">
            <div className="rounded-circle w-[40px] h-[40px] flex justify-center items-center bg-[#272729]">
              <img
                src={paymentType === "tulpar" ? tulparIcon : profileIcon}
                alt="profile"
                className={clsx("w-[15px]", {
                  "!w-full": paymentType === "tulpar",
                })}
              />
            </div>
            <div className="flex flex-col">
              {paymentType === "tulpar" ? (
                <span className="text-grey leading-[16px]">Услуга</span>
              ) : (
                <input
                  value={payment.name}
                  className="rounded-none text-grey leading-[16px] bg-transparent p-0"
                  onChange={({ target: { value } }) =>
                    setPayment({ ...payment, name: value })
                  }
                />
              )}
              <strong>
                {paymentType === "tulpar"
                  ? "Тулпар - оплата за проезд"
                  : `996 ${formatPhone(payment.phone || 0)}`}
              </strong>
            </div>
          </div>
          {paymentType === "" && (
            <strong className="som text-grey text-[21px]">C</strong>
          )}
        </div>
        {paymentType === "tulpar" && (
          <div className="mt-[25px] mb-[15px] rounded-[18px] p-[15px] bg-gray">
            <h2 className="mb-10">Реквизиты</h2>
            <span className="text-grey text-[13px]">Код транспорта</span>
            <span className="block mt-[-3px] ml-[6px]">{transportCode}</span>
          </div>
        )}
        <div
          className={clsx(
            "mt-[25px] mb-[15px] rounded-[18px] p-[15px] bg-gray",
            { "!mt-0": paymentType === "tulpar" }
          )}
        >
          <div className="flex justify-between items-center">
            <span className="text-grey">Сумма перевода</span>
            <span>
              {payment.summ},00 <span className="som text-[14px]">C</span>
            </span>
          </div>
          <div className="mt-10 flex justify-between items-center">
            <span className="text-grey">Коммиссия</span>
            <span>
              0,00 <span className="som text-[14px]">C</span>
            </span>
          </div>
        </div>
        <div className="rounded-[18px] p-[15px] bg-gray">
          <div className="flex justify-between items-center font-bold">
            <span>Сумма списания</span>
            <span>
              {payment.summ},00 <span className="som text-[14px]">C</span>
            </span>
          </div>
        </div>
        {paymentType === "" && (
          <div className="mt-[15px] rounded-[18px] p-[15px] flex items-start gap-[15px] bg-gray">
            <img src={infoIcon} alt="info" className="mt-[3px] w-[17px]" />
            <p className="text-[14px] leading-[20px]">
              Внимание! Отмена данного перевода невозможна, пожалуйста,
              проверьте данные получателя
            </p>
          </div>
        )}
      </div>
      <div>
        <Link onClick={onClickConfirm} to="/payment" className="btn">
          Подтвердить и перевести
        </Link>
        <Link
          to="/payments"
          className="mt-30 block text-center text-red font-bold"
        >
          Отменить перевод
        </Link>
      </div>
    </div>
  );
};

export default ConfirmTransfer;
