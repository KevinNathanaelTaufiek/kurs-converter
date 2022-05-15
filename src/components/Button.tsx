import { FC } from "react";

interface Props {
  children: JSX.Element | string;
  isDisabled?: boolean;
  handleClick?: () => void;
}

const Button: FC<Props> = ({ children, handleClick, isDisabled }) => {
  const classNames = [];

  classNames.push("btn-primary");
  isDisabled && classNames.push("btn-disabled");

  return (
    <button
      className={classNames.join(" ")}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
