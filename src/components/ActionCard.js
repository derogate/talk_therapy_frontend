import React from "react";
import cx from "classnames";

import styles from "./ActionCard.module.scss";

const ActionCard = ({ img, label, ...props }) => {
  return (
    <div
      {...props}
      className={cx(
        styles.card,
        "d-flex flex-column justify-content-end bg-secondary mx-3 p-3"
      )}
    >
      <img src={img} alt="" className="img-fluid mb-auto" />
      <h3 className="text-white fw-bold">{label}</h3>
    </div>
  );
};

export default ActionCard;
