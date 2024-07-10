import { useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/image/logo-home.png";
import icons from "../../utils/icons";
import { path } from "../../utils/constant";
import { Button } from "../../components";

const { AiOutlinePlusCircle } = icons;
function Header() {
  const navigate = useNavigate();
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  return (
    <div className="w-1100">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          <small>Phongtro123.com xin chào</small>
          <Button
            text="Đăng ký"
            textColor="text-white"
            bgColor="bg-[#3961fb]"
            onClick={() => goLogin(true)}
          />
          <Button
            text="Đăng nhập"
            textColor="text-white"
            bgColor="bg-[#3961fb]"
            onClick={() => goLogin(false)}
          />
          <Button
            text="Đăng tin mới"
            textColor="text-white"
            bgColor="bg-third"
            Icon={AiOutlinePlusCircle}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
