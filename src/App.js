import { Route, Routes } from "react-router-dom";
import zipy from 'zipyai';
import HomePage from "./Component/HomePage";
import Profile from "./Component/Profile/Profile";
import { SignIn } from "./Component/Register/SignIn";
import Signup from "./Component/Register/Signup";
import Status from "./Component/Status/Status";
import StatusViewer from "./Component/Status/StatusViewer";
zipy.init('1a5cc3e3');
function App() {
  return (
    <div>
    <Routes>
      <Route  path="/"element={<HomePage/>}></Route>
      <Route  path="/status"element={<Status/>}></Route>
      <Route  path="/status/:userId"element={<StatusViewer/>}></Route>
      <Route  path="/signin"element={<SignIn/>}></Route>
      <Route  path="/signup"element={<Signup/>}></Route>
      <Route  path="/profile"element={<Profile/>}></Route> 



    </Routes>
    </div>
  );
}

export default App;
