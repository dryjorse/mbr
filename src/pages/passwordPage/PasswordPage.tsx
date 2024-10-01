import { FC, useEffect, useState } from "react";
import deleteIcon from "../../assets/images/icons/delete.svg";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isPasswordEnteredAtom } from "../../store/store";
import { useProfile } from "../../hooks/queries/useProfile";
import { useLogout } from "../../hooks/useLogout";

const PasswordPage: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [_, setIsPasswordEntered] = useAtom(isPasswordEnteredAtom);
  const { data: profile } = useProfile();
  const logout = useLogout();

  useEffect(() => {
    let timeout: number;

    if (password.length >= 4) {
      password === "9999" && setIsPasswordEntered(true);
      timeout = setTimeout(() => {
        if (password === "9999") {
          navigate("/");
        } else setPassword("");
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [password]);

  const onClickNumber = (number: number) => {
    password.length < 4 && setPassword((prev) => prev + number);
  };

  const onClickDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  const variants = {
    even: {
      y: [-60, 50],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1,
          times: [0, 0.6, 0.2, 0.4],
          ease: "linear",
        },
      },
    },
    odd: {
      y: [60, -50],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1,
          times: [0, 0.6, 0.2, 0.4],
          ease: "linear",
        },
      },
    },
    initial: {
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="h-[calc(100vh-14px)] pt-[170px] flex flex-col justify-between text-center">
      <div>
        <h1 className="text-[16px]">{profile?.username.split(" ")[0]}</h1>
        <div
          className={clsx(
            "mt-[23px] mx-auto max-w-[140px] flex justify-between items-center trans-def",
            { "max-w-[120px]": password.length >= 4 }
          )}
        >
          {[...new Array(4)].map((_, key) => (
            <motion.div
              key={key}
              variants={variants}
              animate={
                password === "9999" ? (key % 2 ? "odd" : "even") : "initial"
              }
              className={clsx(
                "rounded-circle border border-grey w-[24px] h-[24px]  trans-def !duration-150",
                {
                  "bg-green border-green !w-[18px] !h-[18px]":
                    password.length >= key + 1,
                  "!border-red !bg-red":
                    password.length >= 4 && password !== "9999",
                }
              )}
            ></motion.div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(3,minmax(0,80px))] justify-center gap-[10px]">
        {[...new Array(9)].map((_, key) => (
          <button
            key={key}
            onClick={() => onClickNumber(key + 1)}
            className="rounded-circle bg-gray w-[80px] h-[80px] text-[24px] font-bold"
          >
            {key + 1}
          </button>
        ))}
        <button onClick={logout}>Выйти</button>
        <button
          onClick={() => onClickNumber(0)}
          className="rounded-circle bg-gray w-[80px] h-[80px] text-[24px] font-bold"
        >
          0
        </button>
        <button
          onClick={onClickDelete}
          className="rounded-circle flex justify-center items-center"
        >
          <img src={deleteIcon} alt="delete" className="w-[33px]" />
        </button>
      </div>
    </div>
  );
};

export default PasswordPage;
