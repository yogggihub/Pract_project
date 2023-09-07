/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Sidebar from "./Sidebar";
import SLIDER_IMGS from "../../const/images";
import { useEffect, useState } from "react";
import MainSlider from "../components/MainSlider";
export default function Home() {
  const [allImages, setAllImages] = useState(SLIDER_IMGS[0]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sliderDirection, setSliderDirection] = useState(true);
  const startSlidingRightDirection = () => {
    let index = selectedImage < SLIDER_IMGS.length - 1 ? selectedImage + 1 : 0;
    setSelectedImage(index);
    setAllImages(SLIDER_IMGS[index]);
  };
  const startSlidingLeftDirection = () => {
    let index =
      selectedImage <= SLIDER_IMGS.length - 1 && selectedImage > 0
        ? selectedImage - 1
        : SLIDER_IMGS.length - 1;
    setSelectedImage(index);
    setAllImages(SLIDER_IMGS[index]);
  };
  useEffect(() => {
    // for right slider direction
    if (!paused && sliderDirection) {
      const interval = setInterval(startSlidingRightDirection, 3000);
      setIntervalId(interval);
      //Clearing the interval
      return () => clearInterval(interval);
    }
    // for left slider direction
    if (!paused && !sliderDirection) {
      const interval = setInterval(startSlidingLeftDirection, 3000);
      setIntervalId(interval);
      //Clearing the interval
      return () => clearInterval(interval);
    }
  }, [selectedImage, paused, sliderDirection]);
  const handleClick = (index) => {
    setAllImages(SLIDER_IMGS[index]);
    setSelectedImage(index);
  };
  const handleNext = () => {
    let index =
      selectedImage < SLIDER_IMGS.length - 1
        ? selectedImage + 1
        : selectedImage;
    setSelectedImage(index);
    setAllImages(SLIDER_IMGS[index]);
  };
  const handlePrevious = () => {
    let index =
      selectedImage <= SLIDER_IMGS.length - 1 && selectedImage > 0
        ? selectedImage - 1
        : selectedImage;
    setSelectedImage(index);
    setAllImages(SLIDER_IMGS[index]);
  };
  const handlePause = () => {
    if (!paused) {
      clearInterval(intervalId);
    }
    setPaused(!paused);
  };
  const changeDirection = () => {
    setSliderDirection(!sliderDirection);
  };
  return (
    <>
      <Sidebar />
      <div className="home">
        <MainSlider
          handlePrevious={handlePrevious}
          handlePause={handlePause}
          handleNext={handleNext}
          handleClick={handleClick}
          paused={paused}
          allImages={allImages}
          changeDirection={changeDirection}
          sliderDirection={sliderDirection}
        />
      </div>
    </>
  );
}
