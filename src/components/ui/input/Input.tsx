import clsx from "clsx";
import { ChangeEvent, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface Props {
  error?: FieldError;
  type?: string;
  className?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<any>) => void;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      error,
      type = "text",
      className,
      value,
      onChange,
      placeholder = "",
      ...register
    },
    ref
  ) => {
    return (
      <>
        <input
          // @ts-ignore
          ref={ref}
          type={type}
          className={clsx(className, { "text-red placeholder:text-red": error?.message })}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...register}
        />
        {(error?.message || error?.type) && (
          <span className="mt-[5px] block max-w-[250px] text-[12px] text-red font-medium">
            {error.message || error.type}
          </span>
        )}
      </>
    );
  }
);

export default Input;
