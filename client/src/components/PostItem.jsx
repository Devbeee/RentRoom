import React from "react";
import moment from "moment";
import "moment/locale/vi";
const PostItem = ({ title, price, image, createdAt }) => {
  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };
  return (
    <div className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
      <img
        src={image[0]}
        alt="anh"
        className="w-[65px] h-[65px] object-cover flex-auto rounded-md"
      />
      <div className="w-full flex flex-col justify-between gap-1">
        <h4 className="text-[14px] text-blue-600 ">{title?.slice(0, 30)}...</h4>
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-medium text-green-500">{price}</span>
          <span className="text-sm text-gray-300">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
