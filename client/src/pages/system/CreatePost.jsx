import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiCreatePost } from "../../services";
import Swal from "sweetalert2";
import { OverView, Address, Loading, Button } from "../../components";
import icons from "../../utils/icons";
import { apiUploadImages } from "../../services";
import { getCodesPriceV2, getCodesAreaV2 } from "../../utils/getCodes";

const { BsCameraFill, ImBin } = icons;
const CreatePost = () => {
  const [payload, setPayload] = useState({
    categoryCode: "",
    star: 0,
    title: "",
    priceNumber: 0,
    areaNumber: 0,
    images: "",
    address: "",
    priceCode: "",
    areaCode: "",
    description: "",
    target: "",
    province: "",
  });
  const { prices, areas, categories, provinces } = useSelector(
    (state) => state.app
  );

  const [isLoading, setIsLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );
      let response = await apiUploadImages(formData);
      if (response.status === 200)
        images = [...images, response.data?.secure_url];
    }
    setIsLoading(false);
    setImagesPreview((prev) => [...prev, ...images]);
  };
  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
  };
  const handleSubmit = async () => {
    let priceCodeArr = getCodesPriceV2(+payload.priceNumber, prices, 1, 15);
    let priceCode = priceCodeArr[0]?.code;

    let areaCodeArr = getCodesAreaV2(+payload.areaNumber, areas, 0, 90);
    let areaCode = areaCodeArr[0]?.code;
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      images: imagesPreview,
      target: payload.target || "Tất cả",
      label: `${
        categories?.find((item) => item.code === payload?.categoryCode)?.value
      } ${payload?.address?.split(",")[0]}`,
      category: categories?.find((item) => item.code === payload?.categoryCode)
        ?.value,
    };
    const res = await apiCreatePost(finalPayload);
    if (res?.data.err === 0) {
      Swal.fire({
        title: "Thành công",
        text: "Đã thêm bài đăng mới",
        icon: "success",
      }).then(() => {
        setPayload({
          categoryCode: "",
          star: 0,
          title: "",
          priceNumber: 0,
          areaNumber: 0,
          images: "",
          address: "",
          priceCode: "",
          areaCode: "",
          description: "",
          target: "",
          province: "",
        });
      });
    } else {
      Swal.fire({
        title: "Oops",
        text: "Có lỗi gì ròi",
        icon: "error",
      });
    }
  };
  return (
    <div className="px-6">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Đăng tin mới
      </h1>

      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address payload={payload} setPayload={setPayload} />
          <OverView payload={payload} setPayload={setPayload} />
          <div className="w-full mb-6">
            <h2 className="font-semibold text-xl py-4">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full mb-6">
              <label
                className="w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md"
                htmlFor="file"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <BsCameraFill color="blue" size={50} />
                    Thêm ảnh
                  </div>
                )}
              </label>
              <input
                onChange={handleFiles}
                hidden
                type="file"
                id="file"
                multiple
              />
              <div className="w-full">
                <h3 className="font-medium py-4">Ảnh đã chọn</h3>
                <div className="flex gap-4 items-center">
                  {imagesPreview?.map((item) => {
                    return (
                      <div key={item} className="relative w-1/3 h-1/3 ">
                        <img
                          src={item}
                          alt="preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <span
                          title="Xóa"
                          onClick={() => handleDeleteImage(item)}
                          className="absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full"
                        >
                          <ImBin />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            text="Tạo mới"
            bgColor="bg-green-600"
            textColor="text-white"
          />
        </div>
        <div className="w-1/3 flex-none">maps</div>
      </div>
    </div>
  );
};

export default CreatePost;
