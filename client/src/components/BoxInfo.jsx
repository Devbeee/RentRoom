import React, { memo } from "react";
import anonAvatar from "../assets/image/anon-avatar.png";
import icons from "../utils/icons";
const { BsDot, BsTelephoneFill, SiZalo } = icons;
const BoxInfo = ({ userData: { name, phone, zalo, avatar } }) => {
  return (
    <div className="w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4">
      <img
        src={avatar || anonAvatar}
        alt="avatar"
        className="w-16 h-16 object-contain rounded-full"
      />
      <h3 className="font-medium text-xl">{name}</h3>
      <span className="flex items-center">
        <BsDot color="green" size={28} />
        <span>Đang hoạt động</span>
      </span>
      <a
        href={`tel:${name}`}
        className="bg-green-500 py-2 flex items-center justify-center gap-2 w-full rounded-md text-white text-lg font-bold"
      >
        <BsTelephoneFill />
        {phone}
      </a>

      <a
        href={`https://zalo.me/${phone}`}
        target="_blank"
        className="bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md text-black text-lg font-bold"
      >
        <SiZalo size={35} color="blue" />
      </a>
    </div>
  );
};

export default memo(BoxInfo);
