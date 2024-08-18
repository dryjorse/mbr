import { FC, Fragment, useState } from "react";
import Uumark from "../../components/uumark/Uumark";
import clsx from "clsx";
import { payments } from "../../constants/data";
import { IPaymentDateType, IPaymentType, IType } from "../../types/types";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import arrowWhiteIcon from "../../assets/images/icons/arrow-white.svg";
import incomeIcon from "../../assets/images/icons/income.svg";
import tulparIcon from "../../assets/images/icons/tulpar.svg";

const MainPage: FC = () => {
  const [summ, setSumm] = useState(1000);
  const [name, setName] = useState("Улан К");
  const [phone, setPhone] = useState(755010965);
  const [transportCode, setTransportCode] = useState(1517);
  const [type, setType] = useState<IType>("");
  const [isUumarkOpen, setIsUumarkOpen] = useState(true);
  const [data, setData] = useState<IPaymentDateType[]>(payments);

  const onClickPayment = (data: IPaymentType) => {
    setSumm(data.summ);
    data.name && setName(data.name);
    data.phone && setPhone(data.phone);
    data.transportCode && setTransportCode(data.transportCode);
    setType(data.type || "");

    setIsUumarkOpen(true);
  };

  return (
    <>
      <div
        className={clsx("px-[7px] pt-40 py-10 trans-def", {
          " blur brightness-50": isUumarkOpen,
        })}
      >
        <div className="flex items-center gap-[25px]">
          <button>
            <img src={arrowIcon} alt="arrow" className="w-[15px]" />
          </button>
          <h1>История платежей</h1>
        </div>
        <button className="mt-20 rounded-[20px] p-[14px] flex justify-between items-center w-full bg-gray text-start">
          <span>Выбрать период</span>
          <img src={arrowWhiteIcon} alt="arrow-white" className="w-[10px]" />
        </button>
        {data.map((payment, key) => (
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
                    <span className="pt-10 whitespace-nowrap">
                      {pm.summ},00{" "}
                      <span className="underline text-[15px]">C</span>
                    </span>
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Uumark
        isOpen={isUumarkOpen}
        close={() => setIsUumarkOpen(false)}
        summState={[summ, setSumm]}
        nameState={[name, setName]}
        phoneState={[phone, setPhone]}
        transportCodeState={[transportCode, setTransportCode]}
        type={type}
        setData={setData}
      />
    </>
  );
};

export default MainPage;
