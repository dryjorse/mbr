import { FC, useState } from "react";
import processingIcon from "../../assets/images/icons/processing.svg";
import { formatNumber } from "../../constants/utils";
import repeatIcon from "../../assets/images/icons/repeat-white.svg";
import timeIcon from "../../assets/images/icons/time.svg";
import favouriteIcon from "../../assets/images/icons/favourite-white.svg";
import { Link } from "react-router-dom";
import Uumark from "../../components/uumark/Uumark";
import clsx from "clsx";
import { useAtom } from "jotai";
import { paymentAtom } from "../../store/store";

const PaymentPage: FC = () => {
  const [isUumarkOpen, setIsUumarkOpen] = useState(false);
  const [{ summ, phone, name }] = useAtom(paymentAtom);

  return (
    <>
      <div
        className={clsx(
          "pt-[300px] h-screen flex flex-col justify-between items-center text-center trans-def",
          { "blur brightness-50": isUumarkOpen }
        )}
      >
        <div className=" translate-y-[-70px]">
          <img
            src={processingIcon}
            alt="processing"
            className="mx-auto w-[60px]"
          />
          <h1 className="mt-[15px] mb-[5px] text-[26px]">Платеж в обработке</h1>
          <strong className="block text-[36px] font-extrabold leading-[34px]">
            {formatNumber(summ, false)},00{" "}
            <span className="som text-[28px] font-black">C</span>
          </strong>
          <button
            onClick={() => setIsUumarkOpen(true)}
            className="mt-30 rounded-[18px] py-[7px] px-[15px] bg-gray font-bold"
          >
            Детали транзакции
          </button>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <button>
              <img
                src={repeatIcon}
                alt="repeat"
                className="mx-auto mb-[5px] w-[40px]"
              />
              <span>Повторить платеж</span>
            </button>
            <button>
              <img
                src={timeIcon}
                alt="repeat"
                className="mx-auto mb-[5px] w-[40px]"
              />
              <span className="brightness-50">Создать автооплату</span>
            </button>
            <button>
              <img
                src={favouriteIcon}
                alt="repeat"
                className="mx-auto mb-[5px] w-[40px]"
              />
              <span>Создать шаблон</span>
            </button>
          </div>
          <Link to="/payments" className="mt-[25px] btn">
            Закрыть
          </Link>
        </div>
      </div>
      <Uumark
        isOpen={isUumarkOpen}
        close={() => setIsUumarkOpen(false)}
        summState={[summ]}
        nameState={[name || ""]}
        phoneState={[phone || 0]}
        type={""}
      />
    </>
  );
};

export default PaymentPage;
