import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatNumber, formatPhone } from "../../constants/utils";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { setName } from "../../store/slices/transferSlice";
import arrowIcon from "../../assets/images/icons/arrow.svg";
import somIcon from "../../assets/images/icons/som.svg";
import arrowDownIcon from "../../assets/images/icons/arrow-down.svg";
import profileIcon from "../../assets/images/icons/profile.svg";
import infoIcon from "../../assets/images/icons/info.svg";

const ConfirmTransfer: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { balance, summ, phone, name } = useSelector(
    (state: RootState) => state.transfer
  );

  return (
    <div className="h-screen flex flex-col justify-between">
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
                value={name}
                className="rounded-none text-grey leading-[16px] bg-transparent p-0"
                onChange={({ target: { value } }) => {
                  console.log(value);
                  dispatch(setName(value));
                }}
              />
              <strong>996 {formatPhone(phone)}</strong>
            </div>
          </div>
          <strong className="som text-grey text-[21px]">C</strong>
        </div>
        <div className="mt-[25px] mb-[15px] rounded-[18px] p-[15px] bg-gray">
          <div className="flex justify-between items-center">
            <span className="text-grey">Сумма перевода</span>
            <span>
              {summ},00 <span className="som text-[14px]">C</span>
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
              {summ},00 <span className="som text-[14px]">C</span>
            </span>
          </div>
        </div>
        <div className="mt-[15px] rounded-[18px] p-[15px] flex items-start gap-[15px] bg-gray">
          <img src={infoIcon} alt="info" className="mt-[3px] w-[17px]" />
          <p className="text-[14px] leading-[20px]">
            Внимание! Отмена данного перевода невозможна, пожалуйста, проверьте
            данные получателя
          </p>
        </div>
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
