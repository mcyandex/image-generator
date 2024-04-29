import { ToastContainer } from "react-toastify";
import ImageGenerator from "./components/ImageGenerator";
import "./scss/App.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <ImageGenerator />
      <ToastContainer />
    </div>
  );
}

export default App;
