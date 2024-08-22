import { FC, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import kgIcon from "../../assets/images/icons/kg.svg";
import crossIcon from "../../assets/images/icons/cross-small.svg";
import markIcon from "../../assets/images/icons/mark-small.svg";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { setName, setPhone } from "../../store/slices/transferSlice";
import { formatPhone } from "../../constants/utils";

const contacts = [
  {
    name: "Ummi",
    phone: 755010965,
    fullname: "Бейшекан А.",
    isMarked: true,
  },
  {
    name: "Дунду",
    phone: 228903050,
    fullname: "Абдуннур А.",
    isMarked: true,
  },
  {
    name: "Жума",
    phone: 706309316,
    fullname: "Эржан Ж.",
    isMarked: true,
  },
  { name: "WhatsApp MEGA", phone: 999500000 },
  { name: "Контакт-Центр MEGA", phone: "500" },
  { name: "Милиция", phone: "102" },
  { name: "Мой номер и тариф", phone: "112" },
  { name: "Пожарная", phone: "101" },
  { name: "Проверка баланса", phone: "500" },
  { name: "Проверка остатков", phone: "505" },
  { name: "Скорая помощь", phone: "103" },
  { name: "Служба газа", phone: "104" },
  { name: "Служба-112", phone: "112" },
];

const TransferByPhone: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { phone } = useSelector((state: RootState) => state.transfer);

  const currentContacts =
    (phone + "").length >= 9
      ? [
          {
            name: "Загрузка...",
            fullname: "Загрузка...",
            phone,
            isMarked: false,
          },
        ]
      : contacts;

  const onClickContact = (fullname: string, phone: number) => {
    dispatch(setName(fullname));
    dispatch(setPhone(phone));
  };

  return (
    <div>
      <div className="flex items-center gap-[30px]">
        <button onClick={() => navigate(-1)}>
          <img src={arrowIcon} alt="arrow" className="w-[15px]" />
        </button>
        <h1 className="text-[16px]">Перевод по номеру телефона</h1>
      </div>
      <div className="mt-[35px] mb-[15px] rounded-[18px] p-[8px] pr-20 flex justify-between bg-gray">
        <div className="flex gap-[8px]">
          <button className="rounded-[14px] p-[8px] flex gap-[8px] items-center bg-[#272729]">
            <img src={kgIcon} alt="kg" className="w-[25px]" />
            <span>+996</span>
          </button>
          <input
            type="text"
            className="bg-transparent"
            placeholder="Номер телефона или имя"
            value={phone || ""}
            onChange={({ target: { value } }) => dispatch(setPhone(+value))}
          />
        </div>
        {!!phone && (
          <button onClick={() => dispatch(setPhone(0))}>
            <img src={crossIcon} alt="cross" className="w-[20px]" />
          </button>
        )}
      </div>
      <div className="overflow-y-scroll max-h-[calc(100vh-138px-50px)]">
        <div className="rounded-[20px] py-[14px] bg-gray">
          {currentContacts.map(({ name, fullname, phone, isMarked }, key) => (
            <Fragment key={name}>
              {!!key && (
                <div className="my-[7px] flex">
                  <div className="flex-[0_1_68px] bg-[#121214]"></div>
                  <div className=" bg-border-gray flex-auto h-[1px]"></div>
                </div>
              )}
              <Link
                to="/transfer-by-phone2"
                onClick={() => fullname && onClickContact(fullname, +phone)}
                className="py-[7px] px-20 flex gap-[20px] items-center"
              >
                <span className="relative border border-[#2F2F31] rounded-circle w-[40px] h-[40px] flex justify-center items-center text-grey">
                  {name
                    .split(" ")
                    .filter((_, key) => key < 2)
                    .map((word) => word.slice(0, 1))
                    .join("")}
                  {isMarked && (
                    <img
                      src={markIcon}
                      alt="mark"
                      className="rounded-circle absolute right-[-3px] bottom-[-2px] w-[17px]"
                    />
                  )}
                </span>
                <div className="flex flex-col">
                  <span>{name}</span>
                  <span className="text-[12px] text-grey">
                    {(phone + "").length >= 4 && "996 "}
                    {(phone + "").length >= 4 ? formatPhone(+phone) : phone}
                  </span>
                </div>
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransferByPhone;
