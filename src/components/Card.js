import React from "react";
import cx from "classnames";

import styles from "./Card.module.scss";

const Card = ({ title, children, className }) => {
  return (
    <div
      className={cx(
        "card text-white bg-secondary position-static",
        styles.cardFix,
        className
      )}
    >
      <div className="card-body">
        <h4 className="card-title text-white">{title}</h4>
        <p className="card-text text-white">{children}</p>
      </div>
    </div>
  );
};

export default Card;
