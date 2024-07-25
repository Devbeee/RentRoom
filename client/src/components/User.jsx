import React from "react";
import { useSelector } from "react-redux";
import anon from "../assets/image/anon-avatar.png";

const User = () => {
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      {Object.keys(userData).length > 0 && (
        <div className="flex items-center gap-2">
          <img
            src={userData?.avatar || anon}
            alt="avatar"
            className="w-10 object-cover rounded-full h-10 border-2 border-white shadow-md"
          />
          <div className="flex flex-col">
            <span>
              Xin chào <span className="font-semibold">{userData?.name}</span>
            </span>
            <span>
              Mã tài khoản:
              <span className="font-medium">
                {userData?.id?.match(/\d/g).join("")?.slice(0, 6)}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
