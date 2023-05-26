import './App.css';
import { RouterProvider} from "react-router";
import {router} from "./navigation/router";

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
