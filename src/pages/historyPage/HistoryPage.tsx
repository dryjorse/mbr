import { FC, Fragment } from "react";
import clsx from "clsx";
import { IPayment } from "../../types/types";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import arrowWhiteIcon from "../../assets/images/icons/arrow-white.svg";
import incomeIcon from "../../assets/images/icons/income.svg";
import tulparIcon from "../../assets/images/icons/tulpar.svg";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isUumarkOpenAtom, paymentAtom } from "../../store/store";
import { useProfile } from "../../hooks/queries/useProfile";
import { useDistributePayments } from "../../hooks/useDistributePayments";

const HistoryPage: FC = () => {
  const navigate = useNavigate();
  const [_, setPayment] = useAtom(paymentAtom);
  const [isUumarkOpen, setIsUumarkOpen] = useAtom(isUumarkOpenAtom);

  const { data: profile } = useProfile();

  const onClickPayment = (data: IPayment) => {
    setPayment(data);
    setIsUumarkOpen(true);
  };

  const payments = useDistributePayments(profile?.payments || []);

  return (
    <>
      <div
        className={clsx("trans-def", {
          "blur brightness-50": isUumarkOpen,
        })}
      >
        <div className="flex items-center gap-[30px]">
          <button onClick={() => navigate(-1)}>
            <img src={arrowIcon} alt="arrow" className="w-[15px]" />
          </button>
          <h1 className="text-[16px]">История платежей</h1>
        </div>
        <button className="mt-20 rounded-[20px] p-[14px] flex justify-between items-center w-full bg-gray text-start">
          <span>Выбрать период</span>
          <img src={arrowWhiteIcon} alt="arrow-white" className="w-[10px]" />
        </button>
        {payments?.map((payment, key) => (
          <div key={key}>
            <h2 className="mt-[15px] mb-[5px] pl-[10px] text-grey font-normal">
              {payment.date}
            </h2>
            <div className="rounded-[20px] py-[14px] bg-gray">
              {payment.payments.map((pm, key) => (
                <Fragment key={key}>
                  {!!key && (
                    <div className="my-[7px] flex">
                      <div className="flex-[0_1_68px] bg-[#121214]"></div>
                      <div className=" bg-border-gray flex-auto h-[1px]"></div>
                    </div>
                  )}
                  <button
                    key={key}
                    onClick={() => onClickPayment(pm)}
                    className="px-[14px] flex justify-between text-start w-full"
                  >
                    <div className="flex gap-[15px] flex-[0_1_280px]">
                      <img
                        src={pm.type === "tulpar" ? tulparIcon : incomeIcon}
                        alt="income"
                        className="w-[40px]"
                      />
                      <div>
                        <h3 className="font-normal leading-[21px] text-[17px]">
                          {pm.type === "tulpar"
                            ? "Тулпар - оплата за проезд"
                            : "Перевод по номеру телефона"}
                        </h3>
                        <span className="mt-[-0px] block text-grey text-[14px]">
                          {pm.type === "tulpar" ? "Оплата по QR" : "Переводы"}
                        </span>
                      </div>
                    </div>
                    <span
                      className={clsx("pt-10 whitespace-nowrap text-center leading-[19px]", {
                        "text-red": !pm.is_success,
                      })}
                    >
                      {(pm.summ as unknown as string).replace(/\./, ",")}{" "}
                      <span className="underline text-[15px]">C</span>
                      {!pm.is_success && (
                        <>
                          <br />
                          <span className="text-[14px]">Отклонен</span>
                        </>
                      )}
                    </span>
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HistoryPage;
