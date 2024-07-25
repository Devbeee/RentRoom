import React, { memo } from "react";
import { Link } from "react-router-dom";
const ProvinceBtn = ({ name, image, code }) => {
  const titleSearch = "Cho thuê" + " " + name;
  return (
    <Link
      to={`/tim-kiem?provinceCode=${code}`}
      state={{ titleSearch }}
      className="shadow-md rounded-bl-md text-blue-700 rounded-br-md cursor-pointer hover:text-orange-600"
    >
      <img
        src={image}
        alt={name}
        className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="font-medium p-2 text-center">{name}</div>
    </Link>
  );
};

export default memo(ProvinceBtn);
