import React from "react";
import styles from "./Modal.module.css";

function Modal(props) {
    const { largeImg, largeImgAlt, closeModal } = props;

    return (
      <div className={styles.Overlay} onClick={closeModal}>
        <div className={styles.Modal}>
          <img src={largeImg} alt={largeImgAlt} />
        </div>
      </div>
    );
}

export default Modal;
