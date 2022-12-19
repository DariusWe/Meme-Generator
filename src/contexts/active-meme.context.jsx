import { createContext, useState } from "react";

export const ActiveMemeContext = createContext(null);

export const ActiveMemeProvider = ({ children }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [topCaption, setTopCaption] = useState("");
  const [bottomCaption, setBottomCaption] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const value = {
    previewImage,
    setPreviewImage,
    topCaption,
    setTopCaption,
    bottomCaption,
    setBottomCaption,
    downloadUrl,
    setDownloadUrl,
  };

  return <ActiveMemeContext.Provider value={value}>{children}</ActiveMemeContext.Provider>;
};
