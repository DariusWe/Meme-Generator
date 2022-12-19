import "./meme-slider.styles.css";
import { useEffect, useState, useContext } from "react";
import { ActiveMemeContext } from "../../contexts/active-meme.context";

const MemeSlider = () => {
  const [images, setImages] = useState(null);
  const { setPreviewImage, setTopCaption, setBottomCaption } = useContext(ActiveMemeContext);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        setImages(data.data.memes);
        setPreviewImage(data.data.memes[0]);
      });
  }, [setPreviewImage]);

  return (
    <div className="meme-slider">
      {images &&
        images.map((image) => (
          <img
            loading="lazy"
            key={image.id}
            src={image.url}
            alt={image.name}
            onClick={() => {
              setTopCaption("");
              setBottomCaption("");
              setPreviewImage(image);
            }}
          />
        ))}
    </div>
  );
};

export default MemeSlider;
