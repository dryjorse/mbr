import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthFields } from "../../types/client.types";
import Input from "../../components/ui/input/Input";
import { useMutation } from "@tanstack/react-query";
import authService from "../../services/auth.service";
import { useAtom } from "jotai";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthAtom } from "../../store/store";
import { saveTokens } from "../../constants/utils";

const AuthPage: FC = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useAtom(isAuthAtom);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<IAuthFields>({ mode: "all" });

  const { mutate: login, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: ({
      data: {
        tokens: { refresh, access },
      },
    }) => {
      saveTokens(access, refresh);
      setIsAuth(true);

      navigate("/password");
    },
    onError: (error: any) => {
      switch (error.response.data.error) {
        case "Invalid credentials":
          setError("password", {
            message: "Неправильный пароль!",
          });
          break;
        case "User with this email does not exist":
          setError("email", {
            message: "Пользователь с таким email не существует!",
          });
          break;
        default:
          break;
      }
    },
  });

  const loginFunc: SubmitHandler<IAuthFields> = (data) => {
    login(data);
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="p-[7px] h-[calc(100vh-14px)] flex flex-col justify-between"
    >
      <div>
        <div>
          <h2 className="mb-[5px]">Email</h2>
          <Input
            type="email"
            className="w-full px-10"
            placeholder="Введите email"
            error={errors.email}
            {...register("email", {
              required: "Поле не может быть пустым",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Введён некорректный email",
              },
            })}
          />
        </div>
        <div className="mt-[15px]">
          <h2 className="mb-[5px]">Password</h2>
          <Input
            className="w-full px-10"
            placeholder="Введите пароль"
            error={errors.password}
            {...register("password", {
              required: "Поле не может быть пустым",
              minLength: {
                value: 5,
                message: "Длина пароля не должен быть меньше 5",
              },
            })}
          />
        </div>
      </div>
      <button
        className="btn"
        disabled={!isValid || isPending}
        onClick={handleSubmit(loginFunc)}
      >
        Войти
      </button>
    </form>
  );
};

export default AuthPage;
