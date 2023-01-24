import "./App.css";
import { Route, Routes } from "react-router-dom";
import  Signup  from "./pages/Signup";
import Weather  from "./pages/Weather";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<SignIn />} />
        <Route exact path='/signup' element={<Signup  />} />
        <Route exact path='/weather' element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
