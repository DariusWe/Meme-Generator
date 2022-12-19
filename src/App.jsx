import "./App.css";
import Preview from "./components/preview/preview.component";
import MemeSlider from "./components/meme-slider/meme-slider.component";
import EditingSection from "./components/editing-section/editing-section.component";

// Problem: Preview is waiting for all images to be loaded. Takes a few seconds.

function App() {
  return (
    <div className="App">
      <MemeSlider />
      <div className="bottom-section">
        <Preview />
        <EditingSection />
      </div>
    </div>
  );
}

export default App;
