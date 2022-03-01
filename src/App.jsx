import "./App.css";
import Searchbar from "./components/Searchbar/Searchbar";
import React, { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";
import Modal from "./components/Modal/Modal";
import PropTypes from "prop-types";

function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [largeImg, setLargeImg] = useState("");
  const [largeImgAlt, setLargeImgAlt] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [imagesDisplayed, setImagesDisplayed] = useState(0);

  const fetchImages = (searchValue, pageNum) => {
    try {
      fetch(
        `https://pixabay.com/api/?&key=24785169-ce0e5464f046c25feb9965069&q=${searchValue}&page=${pageNum}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((data) => data.json())
        .then((data) => {
          setTotalImages(data.total);
          page === 1
            ? setImages(data.hits)
            : setImages([...images, ...data.hits]);
          page === 1
            ? setImagesDisplayed(data.hits.length)
            : setImagesDisplayed(imagesDisplayed + data.hits.length);
        })
        .finally(() => setIsLoaded(true));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages(searchInput, page);
  }, [searchInput, page]);

  const changeHandler = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages(searchInput, page);
  };

  const loadMore = (e) => {
    e.preventDefault();
    setPage(page => page + 1);
  };

  const openModalWindow = (e) => {
    if (e.target.nodeName !== "IMG") {
      return;
    }
    setLargeImg(e.target.dataset.img);
    setLargeImgAlt(e.target.alt);
    setIsModalOpen(true);
  };

  const closeModalWithEsc = (e) => {
    if (e.code === "Escape") {
      setIsModalOpen(false);
    }
  };

  const closeModal = (e) => {
    if (e.target.nodeName === "IMG") {
      return;
    }
    setIsModalOpen(false);
  };

  window.addEventListener("keydown", closeModalWithEsc);

  return (
    <div className="App">
      <Searchbar changeHandler={changeHandler} submitHandler={submitHandler} />

      {isLoaded === true ? (
        <ImageGallery images={images} openModalWindow={openModalWindow} />
      ) : (
        <Oval color="blue" secondaryColor="white" height="100" width="100" />
      )}

      {imagesDisplayed === totalImages ? <></> : <Button loadMore={loadMore} />}

      {isModalOpen === true ? (
        <Modal
          closeModal={closeModal}
          largeImg={largeImg}
          largeImgAlt={largeImgAlt}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;

App.propTypes = {
  page: PropTypes.number,
  images: PropTypes.array,
  isLoaded: PropTypes.bool,
  searchInput: PropTypes.string,
  largeImg: PropTypes.string,
  largeImgAlt: PropTypes.string,
  isModalOpen: PropTypes.bool,
  totalImages: PropTypes.number,
  imagesDisplayed: PropTypes.number,
};
