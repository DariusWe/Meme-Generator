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

  return (
    <div className="App">
      <div className="image-slider">
        {images &&
          images.map((image) => (
            <img key={image.id} src={image.url} alt={image.name} onClick={() => setActiveImage(image)} />
          ))}
      </div>
      <div className="bottom-section">
        <Preview image={activeImage} topCaption={topCaptionValue} bottomCaption={bottomCaptionValue} />
        <div className="editing-section">
          <label htmlFor="top-caption">Caption Top:</label>
          <input id="top-caption" type="text" onChange={(e) => setTopCaptionValue(e.target.value)} />
          <label htmlFor="bottom-caption">Caption Bottom:</label>
          <input id="bottom-caption" type="text" onChange={(e) => setBottomCaptionValue(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default App;
