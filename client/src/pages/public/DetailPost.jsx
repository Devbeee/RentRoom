import React, { useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  createSearchParams,
} from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions";
import { SliderCustom, Map, BoxInfo, RelatedPost } from "../../components";
import icons from "../../utils/icons";
const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsHash, BsStopwatch } =
  icons;
const DetailPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts } = useSelector((state) => state.post);
  const { postId } = useParams();
  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId]);

  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  return (
    <div className="w-full flex gap-4 mt-1">
      <div className="w-[70%]">
        <SliderCustom
          images={posts?.length > 0 && JSON.parse(posts[0]?.images?.image)}
        />
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-red-600">
              {posts[0]?.title}
            </h2>
            <div className="flex items-center gap-2">
              <span>Chuyên mục:</span>
              <Link
                to={`/tim-kiem?labelCode=${posts[0]?.labels?.code}`}
                state={{
                  titleSearch: `Tìm kiếm tin đăng theo chuyên mục ${posts[0]?.labels?.value}`,
                }}
                className="text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer"
              >
                {posts[0]?.labels?.value}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <HiLocationMarker color="#2563EB" />
              <span>{posts[0]?.address}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 font-semibold text-lg text-green-600">
                <TbReportMoney />
                {posts[0]?.attributes?.price}
              </span>
              <span className="flex items-center gap-1 font-semibold text-lg text-green-600">
                <RiCrop2Line />
                {posts[0]?.attributes?.acreage}
              </span>
              <span className="flex items-center gap-1 font-semibold text-lg text-green-600">
                <BsStopwatch />
                {formatTime(posts[0]?.createdAt)}
              </span>
              <span className="flex items-center gap-1 font-semibold text-lg text-green-600">
                <BsHash />
                {posts[0]?.attributes?.hashtag}
              </span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Thông tin mô tả</h3>
            <div className="flex flex-col gap-3">
              {posts[0]?.description &&
                JSON.parse(posts[0]?.description)?.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
            <table className="inline-table w-full">
              <thead></thead>
              <tbody>
                <tr className="w-full">
                  <td className="font-semibold p-2 text-center">Mã tin</td>
                  <td className=" p-2 text-center">
                    {posts[0]?.overviews?.code}
                  </td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="font-semibold p-2 text-center">Khu vực</td>
                  <td className=" p-2 text-center">
                    {posts[0]?.overviews?.area}
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="font-semibold p-2 text-center">
                    Loại tin rao
                  </td>
                  <td className=" p-2 text-center">
                    {posts[0]?.overviews?.type}
                  </td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="font-semibold p-2 text-center">Đối tượng</td>
                  <td className=" p-2 text-center">
                    {posts[0]?.overviews?.target}
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="font-semibold p-2 text-center">Gói tin</td>
                  <td className=" p-2 text-center">
                    {posts[0]?.overviews?.bonus}
                  </td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="font-semibold p-2 text-center">Ngày đăng</td>
                  <td className=" p-2 text-center">
                    {posts[0]?.overviews?.created}
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="font-semibold p-2 text-center">
                    Ngày hết hạn
                  </td>
                  <td className=" p-2 text-center">
                    {posts[0]?.overviews?.expired}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
            <table className="inline-table w-full">
              <thead></thead>
              <tbody>
                <tr className="w-full">
                  <td className="font-semibold p-2 text-center">Liên hệ</td>
                  <td className=" p-2 text-center">{posts[0]?.user?.name}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="font-semibold p-2 text-center">Điện thoại</td>
                  <td className=" p-2 text-center">{posts[0]?.user?.phone}</td>
                </tr>
                <tr className="w-full">
                  <td className="font-semibold p-2 text-center">Zalo</td>
                  <td className=" p-2 text-center">{posts[0]?.user?.zalo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-xl my-4">Bản đồ</h3>
            <Map address={posts[0]?.address} />
            <p className="text-gray-500 text-sn py-4 text-justify">
              Bạn đang xem nội dung tin đăng: "{posts[0]?.title} - Mã tin: #
              {posts[0]?.attributes?.hashtag}". Mọi thông tin liên quan đến tin
              đăng này chỉ mang tính chất tham khảo. Nếu bạn có phản hồi với tin
              đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...), vui
              lòng thông báo để PhòngTrọ123 có thể xử lý.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-8">
        {posts?.length > 0 && <BoxInfo userData={posts[0]?.user} />}
        <RelatedPost />
        <RelatedPost newPost />
      </div>
    </div>
  );
};

export default DetailPost;
