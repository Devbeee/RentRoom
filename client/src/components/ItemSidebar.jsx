import React from "react";
import {
  Link,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import icons from "../utils/icons";
import formatVietnameseToString from "../utils/formatVietnameseToString";
const { GrNext } = icons;
const ItemSidebar = ({ title, content, isDouble, type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const oddEl = content?.filter((item, index) => index % 2 !== 0);
  const evenEl = content?.filter((item, index) => index % 2 === 0);
  const formatContent = oddEl?.map((item, index) => {
    return {
      right: item,
      left: evenEl?.find((item2, index2) => index2 === index),
    };
  });
  const handleFilterPosts = (code) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };
  return (
    <div className="p-4 rounded-md bg-white w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            content.map((item) => {
              return (
                <Link
                  to={`${formatVietnameseToString(item.value)}`}
                  key={item.code}
                  className="flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                >
                  <GrNext size={10} color="#ccc" />
                  <p>{item.value}</p>
                </Link>
              );
            })}
        </div>
      )}
      {isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            formatContent.map((item, index) => {
              return (
                <div key={index} className="">
                  <div className=" flex items-center justify-around">
                    <div
                      onClick={() => handleFilterPosts(item.left.code)}
                      className="flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                    >
                      <GrNext size={10} color="#ccc" />
                      <p>{item.left.value}</p>
                    </div>
                    <div
                      onClick={() => handleFilterPosts(item.right.code)}
                      className="flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                    >
                      <GrNext size={10} color="#ccc" />
                      <p>{item.right.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      {/* {isDouble && (
        <div className="">
          {content?.length > 0 && (
            <div className="flex flex-row gap-4 justify-around">
              <div className="">
                {content.slice(0, 4).map((item) => (
                  <div className="flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed">
                    <GrNext size={10} color="#ccc" />
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="">
                {content.slice(4, 8).map((item) => (
                  <div className="flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed">
                    <GrNext size={10} color="#ccc" />
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default ItemSidebar;
