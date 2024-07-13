import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  RentalApartment,
  RentalHouse,
  RentalSpace,
  RentalRoom,
  HomePage
} from "./pages/public";
import { path } from "./utils/constant";
function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
        <Route
            path={'*'}
            element={<HomePage />}
          ></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route
            path={path.CHO_THUE_CAN_HO}
            element={<RentalApartment />}
          ></Route>
          <Route
            path={path.CHO_THUE_MAT_BANG}
            element={<RentalSpace />}
          ></Route>
          <Route
            path={path.CHO_THUE_PHONG_TRO}
            element={<RentalRoom />}
          ></Route>
          <Route path={path.NHA_CHO_THUE} element={<RentalHouse />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
