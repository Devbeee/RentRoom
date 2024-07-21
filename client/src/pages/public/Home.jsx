import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import { Navigation, Search } from "./index";
import { Intro, Contact } from "../../components";
function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);
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
