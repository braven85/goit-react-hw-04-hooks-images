import React from "react";
import styles from "./ImageGalleryItem.module.css";

function ImageGalleryItem(props) {
  const { id, webformatURL, largeImageURL, tags } = props;
  return (
    <li id={id} className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        data-img={largeImageURL}
      />
    </li>
  );
}

export default ImageGalleryItem;
