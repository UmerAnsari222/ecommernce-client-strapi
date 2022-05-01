import "./App.css";
import NavBar from "./components/NavBar";

import { useRoutes } from "react-router-dom";
import routes from "./routes";

import "@brainhubeu/react-carousel/lib/style.css";
import Category from "./components/Category";

function App() {
  let element = useRoutes(routes);
  return (
    <div>
      <NavBar />
      {element}
      <Category />
    </div>
  );
}

export default App;
