import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Navigation, Search } from "./index";
function Home() {
  return (
    <div className="w-full flex flex-col items-center h-full">
      <Header />
      <Navigation />
      <Search/>
      <div className="w-3/5 flex flex-col items-start">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
