import React, { useEffect, useState } from "react";
import { PostItem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const RelatedPost = ({ newPost }) => {
  const dispatch = useDispatch();
  const { newPosts, outStandingPosts } = useSelector((state) => state.post);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (newPost) {
      dispatch(actions.getNewPosts());
    } else {
      dispatch(actions.getOutStandingPosts());
    }
  }, []);

  useEffect(() => {
    if (newPost) {
      setPosts(newPosts);
    } else {
      setPosts(outStandingPosts);
    }
  }, [newPost, newPosts, outStandingPosts]);

  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="font-semibold text-lg mb-4">
        {newPost ? "Tin mới đăng" : "Tin nổi bật"}
      </h3>
      <div className="w-full flex flex-col gap-2">
        {posts?.length > 0 &&
          posts.map((item) => (
            <PostItem
              key={item.id}
              id={item?.id}
              title={item?.title}
              image={JSON.parse(item?.images?.image)}
              price={item?.attributes?.price}
              createdAt={item?.createdAt}
              star={item?.star}
            />
          ))}
      </div>
    </div>
  );
};

export default RelatedPost;
