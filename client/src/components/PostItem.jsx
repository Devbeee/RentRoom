import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import formatVietnameseToString from "../utils/formatVietnameseToString";

import icons from "../utils/icons";
const { GrStar } = icons;

const PostItem = ({id, title, price, image, star, createdAt }) => {
  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++)
      stars.push(<GrStar className="star-item" size={18} color="#ffd250" />);
    return stars;
  };
  return (
    <Link 
    to={`/chi-tiet/${formatVietnameseToString(
      title.replaceAll("/", "")
    )}/${id}`}
    className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
      <img
        src={image[0]}
        alt="anh"
        className="w-[65px] h-[65px] object-cover flex-auto rounded-md"
      />
      <div className="w-full flex flex-col justify-between gap-1">
        <h4 className="text-[14px] text-blue-600 ">
          {handleStar(+star).length > 0 &&
            handleStar(+star).map((star, number) => {
              return <span key={number}>{star}</span>;
            })}
          {title?.slice(0, 30)}...
        </h4>
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-medium text-green-500">{price}</span>
          <span className="text-sm text-gray-300">{formatTime(createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
