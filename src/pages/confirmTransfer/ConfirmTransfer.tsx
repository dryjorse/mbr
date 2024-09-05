import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatNumber, formatPhone } from "../../constants/utils";
import { useAtom } from "jotai";
import { paymentAtom } from "../../store/store";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import somIcon from "../../assets/images/icons/som.svg";
import arrowDownIcon from "../../assets/images/icons/arrow-down.svg";
import profileIcon from "../../assets/images/icons/profile.svg";
import infoIcon from "../../assets/images/icons/info.svg";
import tulparIcon from "../../assets/images/icons/tulpar.svg";
import clsx from "clsx";
import { useProfile } from "../../hooks/queries/useProfile";

const ConfirmTransfer: FC = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useAtom(paymentAtom);
  const { data: profile } = useProfile();
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
  });

  return (
    <div className="h-[calc(100vh-14px)] flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-[30px]">
          <button onClick={() => navigate(-1)}>
            <img src={arrowIcon} alt="arrow" className="w-[15px]" />
          </button>
          <h1 className="text-[16px]">
            Подтвердждение {payment.type === "tulpar" ? "платежа" : "перевода"}
          </h1>
        </div>
        <div className="relative mt-20 mb-[15px] rounded-[18px] p-[15px] flex gap-[13px] items-center bg-gray">
          <img src={somIcon} alt="som" className="w-[40px]" />
          <div className="flex flex-col text-grey">
            <span>
              <span className="text-[50px] leading-[0px] tracking-[-3px]">
                ..
              </span>
              {(profile?.account + "").slice(-4)}
            </span>
            <span className="font-bold text-[17px]">
              <span className="text-white">
                {formatNumber(profile?.balance || 0, false)}
              </span>{" "}
              <span className="som text-[15px]">C</span>
            </span>
          </div>
          {payment.type === "transfer" && (
            <div className="absolute left-[50%] bottom-[-20px] translate-x-[-50%] rounded-circle border border-black bg-gray w-[30px] h-[30px] flex justify-center items-center">
              <img src={arrowDownIcon} alt="arrow-down" className="w-[10px]" />
            </div>
          )}
        </div>
        <div className="rounded-[18px] p-[15px] bg-gray flex justify-between items-center">
          <div className="flex gap-[13px] items-center">
            <div className="rounded-circle w-[40px] h-[40px] flex justify-center items-center bg-[#272729]">
              <img
                src={payment.type === "tulpar" ? tulparIcon : profileIcon}
                alt="profile"
                className={clsx("w-[15px]", {
                  "!w-full": payment.type === "tulpar",
                })}
              />
            </div>
            <div className="flex flex-col">
              {payment.type === "tulpar" ? (
                <span className="text-grey leading-[16px]">Услуга</span>
              ) : (
                <input
                  value={payment.fullname}
                  className="rounded-none text-grey leading-[16px] bg-transparent p-0"
                  onChange={({ target: { value } }) =>
                    setPayment({ ...payment, fullname: value })
                  }
                />
              )}
              <strong>
                {payment.type === "tulpar"
                  ? "Тулпар - оплата за проезд"
                  : `996 ${formatPhone(payment.phone || 0)}`}
              </strong>
            </div>
          </div>
          {payment.type === "transfer" && (
            <strong className="som text-grey text-[21px]">C</strong>
          )}
        </div>
        {payment.type === "tulpar" && (
          <div className="mt-[25px] mb-[15px] rounded-[18px] p-[15px] bg-gray">
            <h2 className="mb-10">Реквизиты</h2>
            <span className="text-grey text-[13px]">Код транспорта</span>
            <span className="block mt-[-3px] ml-[6px]">
              {payment.transport_code}
            </span>
          </div>
        )}
        <div
          className={clsx(
            "mt-[25px] mb-[15px] rounded-[18px] p-[15px] bg-gray",
            { "!mt-0": payment.type === "tulpar" }
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
        {payment.type === "transfer" && (
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
        <Link to="/payment" className="btn">
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
