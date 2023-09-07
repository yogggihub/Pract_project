import React from "react";
import SLIDER_IMGS from "../../const/images"

const MainSlider = ({
  handlePrevious,
  handlePause,
  handleNext,
  handleClick,
  paused,
  allImages,
  changeDirection,
  sliderDirection,
}) => {
  return (
    <div className="slider-container">
      <div className="bigImage">
        <img
          className="slide"
          alt={allImages.alt}
          src={allImages.path}
          height="auto"
          width="600"
        />
        <div className="slider-controlers">
          <button className="prev-btn" onClick={handlePrevious} title="Prev">
            &#8249;
          </button>
          <button className="next-btn" onClick={handleNext} title="Next">
            &#8250;
          </button>
        </div>
      </div>
      <div className="thumbnail">
        {SLIDER_IMGS.map((item, index) => (
          <img
            onClick={() => handleClick(index)}
            key={item.id}
            src={item.path}
            alt={item.alt}
            title={item.alt}
            width="90"
            height="auto"
            className={allImages.id === index ? "activeSlider" : ""}
          />
        ))}
        <div className="direction-control">
          <button
            className="direction"
            title={sliderDirection ? "Change Right To Left" : "Change Left To Right"}
            onClick={changeDirection}
          >
            {sliderDirection ? <>&#8249;&#8249;</> :  <>&#8250;&#8250;</>}
          </button>
          <button
            className="pause-btn"
            onClick={handlePause}
            title={paused ? "Start" : "Pause"}
          >
            {paused ? <>&#xe072;</> : <>&#10074;&#10074;</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
