import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { Button, UpdatePost } from "../../components";
import moment from "moment";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";
const ManagePost = () => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const { postsOfAdmin, dataEdit } = useSelector((state) => state.post);
  const [postsFilter, setPostsFilter] = useState([]);
  useEffect(() => {
    dispatch(actions.getPostsLimitAdmin());
  }, [dataEdit]);
  useEffect(() => {
    setPostsFilter(postsOfAdmin);
  }, [postsOfAdmin]);
  const checkStatus = (dateString) => {
    let toDay = new Date().toDateString();
    return moment(dateString, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      toDay
    );
  };
  const handleDeletePost = async (post) => {
    Swal.fire({
      title: "Bạn có muốn xoá không?",
      text: "Bạn không thể khôi phục",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payloadDeleteData = {
          postId: post?.id,
          imagesId: post?.imagesId,
          attributesId: post?.attributesId,
          overviewId: post?.overviewId,
        };
        const res = await apiDeletePost(payloadDeleteData);
        if (res?.data.err === 0) {
          dispatch(actions.getPostsLimitAdmin());
          Swal.fire({
            title: "Thành công",
            text: "Xoá bài đăng thành công",
            icon: "success",
          });
        }
      }
    });
  };
  const handleFilterByStatus = (statusCode) => {
    if (+statusCode === 1) {
      const activePosts = postsOfAdmin?.filter((post) =>
        checkStatus(post?.overviews?.expired?.split(" ")[3])
      );
      setPostsFilter(activePosts);
    } else if (+statusCode === 0) {
      const expirePosts = postsOfAdmin?.filter(
        (post) => !checkStatus(post?.overviews?.expired?.split(" ")[3])
      );
      setPostsFilter(expirePosts);
    } else {
      setPostsFilter(postsOfAdmin);
    }
  };
  return (
    <div className="">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select
          name=""
          id=""
          className="outline-none border p-2 border-gray-200 rounded-md"
          onChange={(e) => handleFilterByStatus(e.target.value)}
        >
          <option value="2">Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="0">Đã hết hạn</option>
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Mã tin</th>
            <th className="border p-2">Ảnh đại diện</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Ngày bắt đầu</th>
            <th className="border p-2">Ngày hết hạn</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Tuỳ chọn</th>
          </tr>
        </thead>
        <tbody>
          {postsFilter?.length > 0 ? (
            postsFilter.map((post) => (
              <tr key={post.id}>
                <td className="border p-2 text-center">
                  {post?.overviews?.code}
                </td>
                <td className="border p-2 text-center align-middle h-[50px]">
                  <img
                    className="w-10 h-10 object-cover rounded-md inline-block"
                    src={JSON.parse(post?.images?.image)[0] || ""}
                    alt="avatar-post"
                  />
                </td>
                <td className="border p-2 text-center">{post?.title}</td>
                <td className="border p-2 text-center">
                  {post?.attributes?.price}
                </td>
                <td className="border p-2 text-center">
                  {post?.overviews?.created}
                </td>
                <td className="border p-2 text-center">
                  {post?.overviews?.expired}
                </td>
                <td className="border p-2 text-center">
                  {checkStatus(post?.overviews?.expired?.split(" ")[3])
                    ? "Đang hoạt động"
                    : "Đã hết hạn"}
                </td>
                <td className="border p-2 text-center flex items-center justify-center gap-4">
                  <Button
                    text={"Sửa"}
                    bgColor={"bg-green-500"}
                    textColor={"text-white"}
                    onClick={() => {
                      dispatch(actions.editPost(post));
                      setIsEdit(true);
                    }}
                  />
                  <Button
                    text={"Xoá"}
                    bgColor={"bg-orange-500"}
                    textColor={"text-white"}
                    onClick={() => handleDeletePost(post)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Đăng tin đi</td>
            </tr>
          )}
        </tbody>
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
