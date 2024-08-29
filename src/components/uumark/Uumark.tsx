import { Dispatch, FC, SetStateAction, useState } from "react";
import { formatNumber, randomInteger } from "../../constants/utils";
import logoIcon from "../../assets/images/icons/logo.webp";
import crossIcon from "../../assets/images/icons/cross.svg";
import markIcon from "../../assets/images/icons/mark.svg";
import borderIcon from "../../assets/images/icons/border.svg";
import taskIcon from "../../assets/images/icons/task.svg";
import repeatIcon from "../../assets/images/icons/repeat.svg";
import favouriteIcon from "../../assets/images/icons/favourite.svg";
import clsx from "clsx";
import { IType } from "../../types/types";
import { RootState, useAppDispatch } from "../../store/store";
import { setPayments } from "../../store/slices/transferSlice";
import { useSelector } from "react-redux";

interface Props {
  isOpen: boolean;
  close: () => void;
  summState: [number, Dispatch<SetStateAction<number>>?];
  nameState: [string, Dispatch<SetStateAction<string>>?];
  phoneState: [number, Dispatch<SetStateAction<number>>?];
  type?: IType;
  transportCodeState?: [number, Dispatch<SetStateAction<number>>?];
}

const Uumark: FC<Props> = ({
  isOpen,
  close,
  summState,
  nameState,
  phoneState,
  type,
  transportCodeState,
}) => {
  const dispatch = useAppDispatch();
  const [summ, setSumm] = summState;
  const [name, setName] = nameState;
  const [phone, setPhone] = phoneState;
  const [transportCode, setTransportCode] = transportCodeState || [];
  const [clicks, setClicks] = useState(0);
  const { payments } = useSelector((state: RootState) => state.transfer);

  const date = new Date();
  const currentDate = `${formatNumber(date.getDate())}.${formatNumber(
    date.getMonth()
  )}.${date.getFullYear()}, ${formatNumber(date.getHours())}:${formatNumber(
    date.getMinutes()
  )}`;

  const getRandomRecipt = () => {
    let result = "";

    for (let i = 0; i < 9; i++) {
      result += randomInteger(0, 9);
    }

    return `P0815${result}`;
  };

  const onClickSecr = () => {
    setClicks((prev) => prev + 1);

    if (clicks >= 3) {
      let newSumm: number = 0;
      let newName: string = "";
      let newPhone: number = 0;
      let newTransportCode: number = 0;

      if (type === "tulpar") {
        while (!newTransportCode) {
          newTransportCode = +(prompt("Введите код транспорта") || 0);
        }
      } else {
        while (!newPhone) {
          newPhone = +(prompt("Введите номер телефона") || 0);
        }
        while (!newName) {
          newName = prompt("Введите имя") || "";
        }
      }

      while (!newSumm) {
        newSumm = +(prompt("Введите сумму") || 0);
      }

      setSumm?.(newSumm);
      setName?.(newName);
      setPhone?.(newPhone);
      setTransportCode?.(newTransportCode);

      dispatch(
        setPayments([
          {
            date: "Сегодня",
            payments: [
              {
                name: newName,
                summ: newSumm,
                phone: newPhone,
                transportCode: newTransportCode,
                type: type,
              },
              ...(payments.find(({ date }) => date === "Сегодня")?.payments ||
                []),
            ],
          },
          ...payments.filter(({ date }) => date !== "Сегодня"),
        ])
      );
    }
  };

  return (
    <div
      className={clsx(
        "fixed top-0 bottom-0 left-0 right-0 px-[7px] flex justify-center items-center flex-col trans-def",
        { "opacity-0 pointer-events-none": !isOpen }
      )}
    >
      <button
        onClick={onClickSecr}
        className="fixed top-0 right-0 w-[200px] h-[70px] z-50"
      ></button>
      <div className="rounded-[24px] p-20 w-full bg-gray">
        <div className="flex justify-between items-center">
          <img src={logoIcon} alt="logo" className="w-[80px]" />
          <button onClick={close}>
            <img src={crossIcon} alt="cross" className="w-[26px]" />
          </button>
        </div>
        <img
          src={markIcon}
          alt="mark"
          className="mt-30 mb-20 mx-auto block w-[70px]"
        />
        <h1 className="text-[21px] text-center text-green">
          Транзакция успешно проведена
        </h1>
        <h2 className="mt-20 text-[24px] text-center flex justify-center items-center">
          - {formatNumber(summ)},00{" "}
          <span className="block underline text-[21px] ml-[6px] font-black">
            C
          </span>
        </h2>
        <h3 className="text-center text-grey text-[17px]">
          {type === "tulpar"
            ? "Тулпар - оплата за проезд"
            : "Перевод по номеру телефона"}
        </h3>
        <img src={borderIcon} alt="border" className="w-full my-10" />
        <div className="my-[7px] flex justify-between items-center text-[15px]">
          <span className="text-grey">Имя получателя</span>
          <span className="text-end flex-[0_1_200px]">
            {type === "tulpar" ? "CASH OUT ТУЛПАР ОПЛАТА ЗА ПРОЕЗД" : name}
          </span>
        </div>
        <div className="my-[7px] flex justify-between text-[15px]">
          <span className="text-grey">Оплачено со счета</span>
          <span>1030120546212789</span>
        </div>
        <div className="my-[7px] flex justify-between text-[15px]">
          <span className="text-grey">Дата операции</span>
          <span>{currentDate}</span>
        </div>
        <div className="my-[7px] flex justify-between text-[15px]">
          <span className="text-grey">Номер квитанции</span>
          <span>{getRandomRecipt()}</span>
        </div>
        {type === "tulpar" && (
          <div className="my-[10px] flex justify-between text-[15px]">
            <span className="text-grey">Код транспорта</span>
            <span>{transportCode}</span>
          </div>
        )}
        <img src={borderIcon} alt="border" className="w-full my-10" />
        <p className="text-start text-[15px] text-grey">
          {type === "tulpar" ? (
            `Оплата услуг: Получатель: Тулпар - оплата за проезд. ${transportCode}/${summ}.00`
          ) : (
            <>
              Перевод по номеру телефона. 996{phone}/
              <br />
              {name.replace(/\./g, "")} ./ /
            </>
          )}{" "}
          Сумма <span className="summ">{formatNumber(summ)}</span>
          .00 KGS
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
