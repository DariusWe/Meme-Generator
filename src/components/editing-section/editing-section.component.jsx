import "./editing-section.styles.css";
import { useContext } from "react";
import { ActiveMemeContext } from "../../contexts/active-meme.context";

const EditingSection = () => {
  const { setPreviewImage, topCaption, setTopCaption, bottomCaption, setBottomCaption, downloadUrl } =
    useContext(ActiveMemeContext);

  const resetPreviewImage = (image) => {
    setPreviewImage(image);
    setTopCaption("");
    setBottomCaption("");
  };

  const handleUploadedImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;
      image.onload = (e) => {
        const width = e.target.width;
        const height = e.target.height;
        resetPreviewImage({
          url: reader.result,
          name: file.title,
          width: width,
          height: height,
        });
      };
    };
  };

  return (
    <div className="editing-section">
      <label htmlFor="uploaded-img">Upload an image:</label>
      <input type="file" id="uploaded-img" accept=".png, .jpg, .jpeg" onChange={handleUploadedImage} />
      <label htmlFor="top-caption">Caption Top:</label>
      <input id="top-caption" type="text" onChange={(e) => setTopCaption(e.target.value)} value={topCaption} />
      <label htmlFor="bottom-caption">Caption Bottom:</label>
      <input id="bottom-caption" type="text" onChange={(e) => setBottomCaption(e.target.value)} value={bottomCaption} />
      <a href={downloadUrl} download>
        Download Meme
      </a>
    </div>
  );
};

export default EditingSection;
