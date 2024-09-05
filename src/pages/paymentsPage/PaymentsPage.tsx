import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { contacts } from "../../constants/data";
import {
  motion,
  useAnimation,
  useScroll,
  useViewportScroll,
} from "framer-motion";
import { randomInteger } from "../../constants/utils";
import searchIcon from "../../assets/images/icons/search.svg";
import phoneIcon from "../../assets/images/icons/phone.svg";
import worldIcon from "../../assets/images/icons/world.svg";
import visaIcon from "../../assets/images/icons/visa.svg";
import cardIcon from "../../assets/images/icons/card.svg";
import swiftIcon from "../../assets/images/icons/swift.svg";
import reqvIcon from "../../assets/images/icons/reqv.svg";
import mobileCommIcon from "../../assets/images/icons/mobile-comm.svg";
import commAndPhoneIcon from "../../assets/images/icons/comm-and-phone.svg";
import internetIcon from "../../assets/images/icons/internet.svg";
import finesIcon from "../../assets/images/icons/fines.svg";
import walletIcon from "../../assets/images/icons/wallet.svg";
import otherBanksIcon from "../../assets/images/icons/other-banks.svg";
import qrIcon from "../../assets/images/icons/qr.svg";
import russiaIcon from "../../assets/images/icons/russia.svg";
import moneyQueriesIcon from "../../assets/images/icons/money-queries.svg";
import markIcon from "../../assets/images/icons/mark-small.svg";
import { useAtom } from "jotai";
import { paymentAtom } from "../../store/store";

const transtactionTypes = [
  { icon: worldIcon, title: "В другую страну", isNew: true },
  { icon: visaIcon, title: "Пополнение карт Visa", isNew: true },
  { icon: cardIcon, title: "По номеру карты" },
  { icon: swiftIcon, title: "SWIFT- Переводы" },
  { icon: reqvIcon, title: "По реквизитам" },
];

const paymentTypes = [
  { icon: mobileCommIcon, title: "Мобильная связь" },
  { icon: commAndPhoneIcon, title: "Коммуналка и телефон" },
  { icon: internetIcon, title: "Интернет и ТВ" },
  { icon: finesIcon, title: "Штрафы и налоги" },
  { icon: walletIcon, title: "Электронные кошельки" },
  { icon: otherBanksIcon, title: "Другие банки" },
];

const billFullTypes = [
  { icon: qrIcon, title: "По единому QR", descr: "без комиссии" },
  {
    icon: visaIcon,
    title: "С карты любого банка мира",
    descr: "для карт Visa",
  },
  {
    icon: russiaIcon,
    title: "С карты российского банка",
    descr: "для карт выпущенных на территории РФ (Мир, Visa, MasterCard)",
  },
  {
    icon: moneyQueriesIcon,
    title: "Денежные запросы",
    descr: "по номеру телефона у клиентов MBANK",
  },
];

const paymentsPlaceholders = [
  "Штрафы",
  "Газ",
  "Свет",
  "Мобильная связь",
  "ТВ",
  "Вода",
  "Вывоз мусора",
  "Домофон",
  "МКК",
  "Интернет",
  "Образование",
  "Лифт",
];

const PaymentsPage: FC = () => {
  const controls = useAnimation();
  const [payment, setPayment] = useAtom(paymentAtom);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateFontSize = () => {
      if (scrollY.get() > 10) {
        controls.start({ fontSize: "21px" });
      } else {
        controls.start({ fontSize: "28px" });
      }
    };

    const unsubscribe = scrollY.on("change", updateFontSize);

    return () => unsubscribe();
  }, [controls, scrollY]);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 pt-[7px] pb-10 pl-[7px] pr-[15px] flex justify-between items-center bg-black z-10">
        <motion.h1
          initial={{ fontSize: "28px" }}
          animate={controls}
          transition={{ duration: 0.1 }}
        >
          Платежи
        </motion.h1>
        <Link to="/history" className="text-green font-bold">
          История
        </Link>
      </div>
      <div className="mt-[57px] mb-[15px] relative flex items-center">
        <img
          src={searchIcon}
          alt="search"
          className="absolute w-[18px] left-[20px]"
        />
        <input
          type="text"
          className="mx-auto pl-[45px] block w-[calc(100%-6px)]"
          placeholder={
            paymentsPlaceholders[
              randomInteger(0, paymentsPlaceholders.length - 1)
            ]
          }
        />
      </div>
      <h2 className="text-[24px]">Переводы по телефону</h2>
      <div className="mt-10 flex items-start gap-[30px] text-center text-[14px] leading-[18px]">
        <Link to="/transfer-by-phone">
          <img
            src={phoneIcon}
            alt="phone"
            className="mx-auto mb-[5px] w-[50px]"
          />
          <span>
            По номеру
            <br /> телефона
          </span>
        </Link>
        {contacts.map((contact) => (
          <Link
            onClick={() => {
              setPayment({
                ...payment,
                fullname: contact.fullname,
                phone: contact.tel,
                type: "transfer",
              });
            }}
            key={contact.name}
            to="/transfer-by-phone2"
          >
            <div className="relative mb-[5px] border border-[#2C2C2E] rounded-circle w-[49px] h-[49px] flex justify-center items-center bg-gray text-center text-grey text-[16px] font-medium">
              {contact.name.slice(0, 1)}
              <img
                src={markIcon}
                alt="mark"
                className="rounded-circle absolute right-[-3px] bottom-[-2px] w-[20px]"
              />
            </div>
            <span>{contact.name}</span>
          </Link>
        ))}
      </div>
      <div className="my-20 pr-[15px] flex justify-between items-center">
        <h2 className="text-[24px]">Переводы</h2>
        <Link to="/translation-types" className="text-green font-bold">
          Ещё
        </Link>
      </div>
      <div className="flex gap-[10px] overflow-x-scroll">
        {transtactionTypes.map((paym) => (
          <div
            key={paym.title}
            className="relative rounded-[18px] p-[8px] flex-[0_0_104px] h-[100px] bg-gray text-[12px] font-bold leading-[14px]"
          >
            {paym.isNew && (
              <span className="rounded-[12px] py-[4px] px-[6px] absolute top-[8px] right-[8px] bg-red uppercase text-[7px]">
                new
              </span>
            )}
            <img
              src={paym.icon}
              alt="payment-icon"
              className="mb-[8px] w-[45px]"
            />
            <span>{paym.title}</span>
          </div>
        ))}
      </div>
      <div className="my-20 pr-[15px] flex justify-between items-center">
        <h2 className="text-[24px]">Платежи</h2>
        <Link to="/payment-types" className="text-green font-bold">
          Ещё
        </Link>
      </div>
      <div className="flex gap-[10px] overflow-x-scroll">
        {paymentTypes.map((paym) => (
          <div
            key={paym.title}
            className="relative rounded-[18px] p-[8px] flex-[0_0_104px] h-[100px] bg-gray text-[12px] font-bold leading-[14px]"
          >
            <img
              src={paym.icon}
              alt="payment-icon"
              className="mb-[8px] w-[45px]"
            />
            <span>{paym.title}</span>
          </div>
        ))}
      </div>
      <h2 className="my-20 text-[24px]">Пополнить счёт</h2>
      {billFullTypes.map(({ icon, title, descr }) => (
        <Link
          to="/full-bill"
          key={title}
          className="mb-10 mx-auto rounded-[18px] p-[15px] flex gap-[10px] w-[calc(100%-10px)] bg-gray"
        >
          <img src={icon} alt="bill-full" className="w-[45px]" />
          <div className="flex flex-col justify-between">
            <strong>{title}</strong>
            <span className="text-[14px] text-grey">{descr}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PaymentsPage;
