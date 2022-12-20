import "./preview.styles.css";
import { useRef, useEffect, useContext } from "react";
import { ActiveMemeContext } from "../../contexts/active-meme.context";

const CANVAS_WIDTH = 300;

const Preview = () => {
  const { previewImage, topCaption, bottomCaption, setDownloadUrl } = useContext(ActiveMemeContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    canvasRef.current && drawCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topCaption, bottomCaption]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasHeight = (previewImage.height / previewImage.width) * CANVAS_WIDTH;
    const img = document.getElementById("source");
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, canvasHeight);
    ctx.font = "24px sans-serif";
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 5;
    ctx.fillText(topCaption, CANVAS_WIDTH / 2, 35);
    ctx.fillText(bottomCaption, CANVAS_WIDTH / 2, canvasHeight - 30);
    const dataURL = canvas.toDataURL();
    setDownloadUrl(dataURL);
  };

  return (
    <div className="preview-container">
      {previewImage && (
        <div>
          <canvas ref={canvasRef} width={300} height={(previewImage.height / previewImage.width) * 300} />
          <img
            crossOrigin="anonymous"
            style={{ display: "none" }}
            id="source"
            src={previewImage.url}
            alt={previewImage.name}
            onLoad={drawCanvas}
          />
        </div>
      )}
    </div>
  );
};

export default Preview;
