import "./App.css";
import { useEffect, useState } from "react";
import Preview from "./components/preview.component";

function App() {
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [topCaptionValue, setTopCaptionValue] = useState("");
  const [bottomCaptionValue, setBottomCaptionValue] = useState("");

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        setImages(data.data.memes);
        setActiveImage(data.data.memes[0]);
      });
  }, []);

  const resetActiveImage = (image) => {
    setActiveImage(image);
    setTopCaptionValue("");
    setBottomCaptionValue("");
  };

  const setUploadedImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.crossOrigin = "";
      image.src = reader.result;
      image.onload = (e) => {
        const width = e.target.width;
        const height = e.target.height;
        resetActiveImage({
          url: reader.result,
          name: file.title,
          width: width,
          height: height,
        });
      };
    };
  };

  return (
    <div className="App">
      <div className="image-slider">
        {images &&
          images.map((image) => (
            <img key={image.id} src={image.url} alt={image.name} onClick={() => resetActiveImage(image)} />
          ))}
      </div>
      <div className="bottom-section">
        <Preview image={activeImage} topCaption={topCaptionValue} bottomCaption={bottomCaptionValue} />
        <div className="editing-section">
          <label htmlFor="uploaded-img">Upload an image:</label>
          <input type="file" id="uploaded-img" accept=".png, .jpg, .jpeg" onChange={setUploadedImage} />
          <label htmlFor="top-caption">Caption Top:</label>
          <input
            id="top-caption"
            type="text"
            onChange={(e) => setTopCaptionValue(e.target.value)}
            value={topCaptionValue}
          />
          <label htmlFor="bottom-caption">Caption Bottom:</label>
          <input
            id="bottom-caption"
            type="text"
            onChange={(e) => setBottomCaptionValue(e.target.value)}
            value={bottomCaptionValue}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
