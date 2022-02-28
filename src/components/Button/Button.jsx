import styles from "./Button.module.css";
import PropTypes from "prop-types";
import React from "react";

function Button({ loadMore }) {
  return (
    <button onClick={loadMore} className={styles.Button}>
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func,
};
