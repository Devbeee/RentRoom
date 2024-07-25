import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Rental,
  HomePage,
  DetailPost,
  SearchResult,
  Contact,
  OTPVerification
} from "./pages/public";
import { System, CreatePost, ManagePost, EditProfile } from "./pages/system";
import * as actions from "./store/actions";

import { path } from "./utils/constant";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    let timer = setTimeout(() => {
      isLoggedIn && dispatch(actions.GetCurrentUser());
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isLoggedIn]);
  useEffect(() => {
    dispatch(actions.GetPrices());
    dispatch(actions.GetAreas());
    dispatch(actions.GetProvinces());
  }, []);
  return (
    <div className=" bg-primary overflow-hidden">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={"*"} element={<HomePage />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />}></Route>
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />}></Route>
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />}></Route>
          <Route path={path.NHA_CHO_THUE} element={<Rental />}></Route>
          <Route path={path.SEARCH} element={<SearchResult />}></Route>
          <Route path={path.CONTACT} element={<Contact />}></Route>
          <Route path={path.VERIFY_OTP} element={<OTPVerification />}></Route>

          <Route
            path={path.DETAL_POST__TITLE__POSTID}
            element={<DetailPost />}
          ></Route>
          {/* <Route path={path.DETAIL} element={<DetailPost />} /> */}
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />}></Route>
          <Route path={path.MANAGE_POST} element={<ManagePost />}></Route>
          <Route path={path.EDIT_PROFILE} element={<EditProfile />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
