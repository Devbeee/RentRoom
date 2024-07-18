import { Routes, Route } from "react-router-dom";
import { Home, Login, Rental, HomePage, DetailPost, SearchResult } from "./pages/public";
import { path } from "./utils/constant";
function App() {
  return (
    <div className=" bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={"*"} element={<HomePage />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />}></Route>
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />}></Route>
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />}></Route>
          <Route path={path.NHA_CHO_THUE} element={<Rental />}></Route>
          <Route path={path.SEARCH} element={<SearchResult />}></Route>
          <Route
            path={path.DETAL_POST__TITLE__POSTID}
            element={<DetailPost />}
          ></Route>
          <Route path={"chi-tiet/*"} element={<DetailPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
