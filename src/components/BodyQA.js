import React from "react";
import cx from "classnames";

const BodyQA = ({ className, question, children }) => {
  return (
    <div className={cx(className)}>
      <h1 className="text-primary">{question}</h1>
      <p>{children}</p>
    </div>
  );
};

export default BodyQA;
