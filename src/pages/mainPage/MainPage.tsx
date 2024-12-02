import { FC, useEffect } from "react";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useProfile } from "../../hooks/queries/useProfile";
import { formatNumber, getCurrentMonth } from "../../constants/utils";
import profileIcon from "../../assets/images/icons/profile-white.svg";
import arrowIcon from "../../assets/images/icons/arrow-white2.svg";
import messageIcon from "../../assets/images/icons/message.svg";
import bellIcon from "../../assets/images/icons/bell.svg";
import somIcon from "../../assets/images/icons/som.svg";
import starIcon from "../../assets/images/icons/star.svg";
import mplusIcon from "../../assets/images/icons/mplus.svg";
import creditIcon from "../../assets/images/icons/credit.svg";
import mgoldIcon from "../../assets/images/icons/mgold.svg";
import depositIcon from "../../assets/images/icons/deposit.svg";
import linkIcon from "../../assets/images/icons/link.svg";
import qrIcon from "../../assets/images/icons/qr.svg";
import qrStoryImage from "../../assets/images/story-qr.png";
import passportStoryImage from "../../assets/images/story-passport.png";
import marketStoryImage from "../../assets/images/story-market.png";
import mtravelStoryImage from "../../assets/images/story-mtravel.png";
import creditStoryImage from "../../assets/images/story-credit.png";
import kaspiStoryImage from "../../assets/images/story-kaspi.png";
import bonusImage from "../../assets/images/bonus.png";
import mbusinessReclamImage from "../../assets/images/second-mbusiness.png";
import countriesReclamImage from "../../assets/images/second-countries.png";
import mtravelReclamImage from "../../assets/images/second-mtravel.png";
import { IType } from "../../types/types";
import clsx from "clsx";

const stories = [
  { image: qrStoryImage, alt: "qr-story" },
  { image: passportStoryImage, alt: "passport-story" },
  { image: marketStoryImage, alt: "market-story" },
  { image: mtravelStoryImage, alt: "mtravel-story" },
  { image: creditStoryImage, alt: "credit-story" },
  { image: kaspiStoryImage, alt: "kaspi-story" },
];

const reclams = [
  { image: mbusinessReclamImage, alt: "mbusiness" },
  { image: countriesReclamImage, alt: "countries" },
  { image: mtravelReclamImage, alt: "mtravel" },
];

const services = [
  {
    icon: mplusIcon,
    title: "MPLUS",
    descr: "Покупки в рассрочку, без процентов",
  },
  {
    icon: creditIcon,
    title: "Онлайн кредит",
    descr: "без подтверждения доходов",
  },
  {
    icon: mgoldIcon,
    title: "Заказать карту",
    descr: "MBANK Gold, Виртуальная карта",
  },
  {
    icon: depositIcon,
    title: "Открыть депозит",
    descr: "за 1 минуту без посещения банка",
  },
  {
    icon: linkIcon,
    title: "Привязать карту",
  },
  {
    icon: qrIcon,
    title: "Мой QR",
  },
];

const MainPage: FC = () => {
  const titleControls = useAnimation();
  const iconControls = useAnimation();
  const { scrollY } = useScroll();
  const { data: profile } = useProfile();

  useEffect(() => {
    const updateFontSize = () => {
      if (scrollY.get() > 10) {
        iconControls.start({ width: "20px" });
        titleControls.start({ fontSize: "21px" });
      } else {
        iconControls.start({ width: "32px" });
        titleControls.start({ fontSize: "28px" });
      }
    };

    const unsubscribe = scrollY.on("change", updateFontSize);

    return () => unsubscribe();
  }, [titleControls, scrollY]);

  const expensesForCurrentMonth = formatNumber(
    profile?.payments.reduce(
      (prev, payment) =>
        // new Date(payment.created_at).getMonth() === new Date().getMonth() &&
        prev + +payment.summ / payment.users.length,
      0
    ) || 0
  );

  console.log(
    profile?.payments.reduce(
      (prev, payment) => prev + +payment.summ / payment.users.length,
      0
    )
  );

  const expensesTypes = profile?.payments
    .reduce<{ type: IType; percent: number }[]>((prev, payment) => {
      const existing = prev.find((el) => el.type === payment.type);
      const percent =
        (+payment.summ / +expensesForCurrentMonth.replace(/ /, "")) * 100;

      if (existing) {
        existing.percent += percent;
      } else {
        prev.push({ type: payment.type, percent });
      }

      return prev;
    }, [])
    .sort((a, b) => b.percent - a.percent);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 pt-[7px] pb-10 pl-[7px] pr-[15px] flex justify-between items-center bg-black z-10">
        <div className="flex gap-[8px] items-center">
          <motion.img
            initial={{ width: "32px" }}
            animate={iconControls}
            transition={{ duration: 0.1 }}
            src={profileIcon}
            alt="profile"
          />
          <motion.h1
            initial={{ fontSize: "28px" }}
            animate={titleControls}
            transition={{ duration: 0.1 }}
            className="font-extrabold"
          >
            {profile?.username.split(" ")[0]}
          </motion.h1>
          <img src={arrowIcon} alt="" className="w-[7px]" />
        </div>
        <div className="flex gap-[20px]">
          <img src={messageIcon} alt="message" className="w-[20px]" />
          <img src={bellIcon} alt="bell" className="w-[20px]" />
        </div>
      </div>
      <div className="mb-[25px] pt-[62px] flex gap-[10px] overflow-x-scroll">
        {stories.map(({ image, alt }) => (
          <img
            key={alt}
            src={image}
            alt={alt}
            className="w-[100px] h-[100px]"
          />
        ))}
      </div>
      <div className="flex gap-[10px] justify-between">
        <div className="rounded-[18px] p-[15px] bg-gray flex-[0_1_180px]">
          <h2 className="font-extrabold text-[18px]">За {getCurrentMonth()}</h2>
          <span className="text-green font-semibold text-[18px] flex gap-[4px]">
            {expensesForCurrentMonth}
            <span className="som block mt-[2px] brightness-[.7] text-[14px] font-extrabold">
              С
            </span>
          </span>
          <div className="mt-10 rounded-[12px] w-[150px] h-[17px] flex overflow-hidden">
            {expensesTypes?.map(({ type, percent }) => (
              <div
                key={type}
                style={{ width: `${percent}%` }}
                className={clsx("h-full", {
                  "bg-blue": type === "transfer",
                  "bg-turquoise": type === "tulpar",
                })}
              ></div>
            ))}
          </div>
        </div>
        <div className="rounded-[18px] p-[15px] bg-gray flex-[0_1_180px]">
          <h2 className="font-extrabold text-[18px]">Мои Бонусы</h2>
          <span className="text-green font-semibold text-[18px] flex gap-[4px]">
            0
            <span className="border-t mt-[6px] som block brightness-[.7] leading-[14px] text-[14px] no-underline">
              Б
            </span>
          </span>
          <img
            src={bonusImage}
            alt="bonus"
            className="mt-[5px] ml-auto block w-[75px]"
          />
        </div>
      </div>
      <div className="my-[15px] flex gap-[8px] overflow-x-scroll">
        {reclams.map(({ image, alt }) => (
          <img key={alt} src={image} alt={alt} className="w-[317px]" />
        ))}
      </div>
      <div className="rounded-[18px] p-[15px] flex justify-between items-start bg-gray">
        <div className="flex gap-[13px] items-center">
          <img src={somIcon} alt="som" className="w-[40px]" />
          <div className="flex flex-col text-grey">
            <span>
              <span className="text-[50px] leading-[0px] tracking-[-3px]">
                ..
              </span>
              {(profile?.account + "").slice(-4)}
            </span>
            <span className="font-bold">
              <span className="text-white">
                {(formatNumber(profile?.balance || 0, false) + "").replace(
                  /\./,
                  ","
                )}
              </span>{" "}
              <span className="som text-[15px]">C</span>
            </span>
          </div>
        </div>
        <img src={starIcon} alt="star" className="w-[15px]" />
      </div>
      <div className="mt-[15px] grid grid-cols-[repeat(2,minmax(0,auto))] gap-[15px]">
        {services.map(({ icon, title, descr }) => (
          <div key={title} className="rounded-[18px] p-[15px] bg-gray">
            <img src={icon} alt={title} className="w-[40px]" />
            <h3 className="mt-[5px] font-extrabold">{title}</h3>
            <p className="text-[13px] !leading-[17px] text-grey">{descr}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
