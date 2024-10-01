import { FC } from "react";
import { useProfile } from "../../hooks/queries/useProfile";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { formatNumber } from "../../constants/utils";

const ClosedPage: FC = () => {
  const { data } = useProfile();
  const logout = useLogout();

  const totalSumm =
    (
      (data?.payments.reduce(
        (prev, payment) =>
          payment.is_success
            ? prev + +payment.summ / payment.users.length
            : prev,
        0
      ) || 0) + 1
    ).toFixed(2) || 0;

  return (
    <div className="h-[calc(100vh-14px)] flex flex-col  justify-center items-center text-center text-red">
      <h1>
        Искупитесь <br /> {formatNumber(+totalSumm)}{" "}
        <span className="som">C</span>
      </h1>
      <Link to="/history" className="btn mt-20 mb-10">
        Перейти в историю
      </Link>
      <button onClick={logout} className="btn">
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default ClosedPage;
