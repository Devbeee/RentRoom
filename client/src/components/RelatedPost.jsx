import React, { useEffect } from "react";
import { PostItem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
const RelatedPost = () => {
  const dispatch = useDispatch();
  const { newPosts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(actions.getNewPosts());
  }, []);
  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg mb-4">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-2">
        {newPosts.map((item) => (
          <PostItem
            key={item.id}
            title={item.title}
            image={JSON.parse(item?.images?.image)}
            price={item?.attributes?.price}
            createdAt={item?.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedPost;
