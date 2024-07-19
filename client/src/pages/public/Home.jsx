import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import * as actions from "../../store/actions";
import { Navigation, Search } from "./index";
import { Intro, Contact } from "../../components";
function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(actions.GetPrices());
    dispatch(actions.GetAreas());
    dispatch(actions.GetProvinces());
  }, []);
 
  return (
    <div className="w-full flex flex-col items-center h-full">
      <Header />
      <Navigation />
      {isLoggedIn && <Search />}
      <div className="w-3/5 flex flex-col items-start">
        <Outlet />
      </div>
      <Intro />
      <Contact />
    </div>
  );
}

export default Home;
