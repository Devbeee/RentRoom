import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import anonAvatar from "../../assets/image/anon-avatar.png";
import * as actions from "../../store/actions";
import menuSidebar from "../../utils/menuSidebar";

const activeStyle =
  "hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 font-bold bg-gray-200";
const notActiceStyle =
  "hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 cursor-pointer";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="w-[256px] flex-none p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={anonAvatar}
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full border-2 border-white"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{userData?.name}</span>
            <small>{userData?.phone}</small>
          </div>
        </div>
        <span className="text-base">
          Mã thành viên:
          <small className="font-medium">
            {userData?.id?.match(/\d/g).join("")?.slice(0, 6)}
          </small>
        </span>
      </div>
      <div>
        {menuSidebar.map((item) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? activeStyle : notActiceStyle
              }
              key={item.id}
              to={item?.path}
            >
              {item?.icon}
              {item.text}
            </NavLink>
          );
        })}
        <span
          onClick={() => dispatch(actions.logout())}
          className={notActiceStyle}
        >
          <AiOutlineLogout />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
