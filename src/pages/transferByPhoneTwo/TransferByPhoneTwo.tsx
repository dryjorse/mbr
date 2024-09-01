import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatNumber, formatPhone } from "../../constants/utils";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import somIcon from "../../assets/images/icons/som.svg";
import profileIcon from "../../assets/images/icons/profile.svg";
import arrowDownIcon from "../../assets/images/icons/arrow-down.svg";
import clsx from "clsx";
import { useAtom } from "jotai";
import { balanceAtom, paymentAtom } from "../../store/store";

const TransferByPhoneTwo: FC = () => {
  const navigate = useNavigate();
  const [isMessageFocused, setIsMessageFocused] = useState(false);
  const [message, setMessage] = useState("");
  const [payment, setPayment] = useAtom(paymentAtom);
  const [balance] = useAtom(balanceAtom);

  return (
    <div>
      <div className="flex items-center gap-[30px]">
        <button onClick={() => navigate(-1)}>
          <img src={arrowIcon} alt="arrow" className="w-[15px]" />
        </button>
        <h1 className="text-[16px]">Перевод по номеру телефона</h1>
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
        <div className="absolute left-[50%] bottom-[-20px] translate-x-[-50%] rounded-circle border border-black bg-gray w-[30px] h-[30px] flex justify-center items-center">
          <img src={arrowDownIcon} alt="arrow-down" className="w-[10px]" />
        </div>
      </div>
      <div className="rounded-[18px] p-[15px] bg-gray flex justify-between items-center">
        <div className="flex gap-[13px] items-center">
          <div className="rounded-circle w-[40px] h-[40px] flex justify-center items-center bg-[#272729]">
            <img src={profileIcon} alt="profile" className="w-[15px]" />
          </div>
          <div className="flex flex-col">
            <input
              value={payment.name}
              className="rounded-none text-grey leading-[16px] bg-transparent p-0"
              onChange={({ target: { value } }) =>
                setPayment({ ...payment, name: value })
              }
            />
            <strong>996 {formatPhone(payment.phone || 0)}</strong>
          </div>
        </div>
        <strong className="som text-grey text-[21px]">C</strong>
      </div>
      <div className="my-[15px] rounded-[18px] p-[15px] flex flex-col items-center bg-gray">
        <div className="flex text-[26px] font-bold">
          <input
            type="number"
            style={{ width: (payment.summ + "").length * 16 }}
            placeholder="0"
            value={payment.summ || ""}
            onChange={({ target: { value } }) =>
              setPayment({ ...payment, summ: +value })
            }
            className="rounded-none p-0 bg-transparent w-[19px] placeholder:text-[#6B6C70]"
          />
          <span className="ml-[5px] som text-[22px] text-[#6B6C70] font-extrabold">
            C
          </span>
        </div>
        <span className=" text-[14px] font-semibold text-grey">
          Коммиссия 0,00 <strong className="som">C</strong>
        </span>
      </div>
      <div className="flex gap-[7px] items-end">
        <div className="relative py-[20px] pb-[15px] px-[15px] rounded-[18px_18px_4px_18px] flex-auto bg-gray">
          <span
            className={clsx(
              "absolute  text-[12px] text-grey trans-def pointer-events-none",
              {
                "top-[18px]": !(isMessageFocused || message),
                "text-[9px] top-[7px]": isMessageFocused || message,
              }
            )}
          >
            Сообщение получателю
          </span>
          <input
            type="text"
            value={message}
            onFocus={() => setIsMessageFocused(true)}
            onBlur={() => setIsMessageFocused(false)}
            onChange={({ target: { value } }) => setMessage(value)}
            className="rounded-none p-0 bg-transparent w-full text-[13px]"
          />
        </div>
        <div className="rounded-circle bg-gray flex justify-center items-center w-[35px] h-[35px]">
          <img src={profileIcon} alt="profile" className="w-[12px]" />
        </div>
      </div>
      <div className="mt-10 mb-30 pr-[42px] flex gap-[10px] justify-end items-center text-[14px]">
        <button
          onClick={() => setMessage("Рахмат!")}
          className="rounded-[18px] py-[3px] px-[15px] bg-gray"
        >
          Рахмат!
        </button>
        <button
          onClick={() => setMessage("За обед")}
          className="rounded-[18px] py-[3px] px-[15px] bg-gray"
        >
          За обед
        </button>
        <button
          onClick={() => setMessage("Такси")}
          className="rounded-[18px] py-[3px] px-[15px] bg-gray"
        >
          Такси
        </button>
      </div>
      <Link
        to="/confirm-transfer"
        className={clsx("btn", {
          "!bg-[#6B6C70] !text-white pointer-events-none": !payment.summ,
        })}
      >
        Перевести{" "}
        {!!payment.summ && (
          <>
            {payment.summ},00{" "}
            <span className="som block mt-[-6px] text-[20px]">c</span>
          </>
        )}
      </Link>
    </div>
  );
};

export default TransferByPhoneTwo;
