import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import logo from "../../assets/image/logo-home.png";
import icons from "../../utils/icons";
import { path } from "../../utils/constant";
import { Button, User } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../utils/menuManage";
const { AiOutlinePlusCircle, AiOutlineLogout, BsChevronDown } = icons;
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const headerRef = useRef();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page")]);

  return (
    <div ref={headerRef} className="w-3/5">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
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
            </div>
          )}
          {isLoggedIn && (
            <div className="flex items-center gap-3 relative">
              <Button
                text="Quản lý tài khoản"
                textColor="text-white"
                bgColor="bg-blue-700"
                Icon={BsChevronDown}
                onClick={() => setIsShowMenu((prev) => !prev)}
              />
              {isShowMenu && (
                <div
                  className="absolute 
              top-full 
              right-0 
              bg-white 
              shadow-md 
              rounded-md 
              p-4 
              min-w-200 
              flex 
              flex-col 
              z-10
              "
                >
                  {menuManage.map((item) => (
                    <Link
                      className="flex items-center gap-2 hover:text-orange-500 text-blue-600 border-b border-gray-200 py-2"
                      to={item?.path}
                      key={item.id}
                    >
                      {item?.icon}
                      {item.text}
                    </Link>
                  ))}
                  <span
                    className="cursor-pointer hover:text-orange-500 text-blue-600 py-2 flex items-center gap-2"
                    onClick={() => {
                      setIsShowMenu(false);
                      dispatch(actions.logout);
                    }}
                  >
                    <AiOutlineLogout />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}
          <Button
            text="Đăng tin mới"
            textColor="text-white"
            bgColor="bg-third"
            Icon={AiOutlinePlusCircle}
            onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
