import React from "react";
import classNames from "classnames/bind";

const Button = ({
  type = "button",
  isLoading,
  btnStyle = "primary",
  className,
  children,
  ...props
}) => {
  const btnClass = classNames(
    {
      btn: true,
      [`btn-${btnStyle}`]: true,
    },
    className
  );

  return (
    <button
      // eslint-disable-next-line
      type={type}
      className={btnClass}
      {...props}
    >
      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!isLoading && children}
    </button>
  );
};

export default Button;
