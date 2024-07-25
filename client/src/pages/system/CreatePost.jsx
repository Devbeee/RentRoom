import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCreatePost, apiUpdatePost } from "../../services";
import Swal from "sweetalert2";
import { OverView, Address, Loading, Button, Map } from "../../components";
import icons from "../../utils/icons";
import { apiUploadImages } from "../../services";
import { getCodesPriceV2, getCodesAreaV2 } from "../../utils/getCodes";
import validate from "../../utils/validateForm";
import { resetPost } from "../../store/actions";
const { BsCameraFill, ImBin } = icons;
const CreatePost = ({ isEdit, setIsEdit }) => {
  const dispatch = useDispatch();
  const { dataEdit } = useSelector((state) => state.post);
  const [payload, setPayload] = useState(() => {
    const payload = {
      categoryCode: dataEdit?.categoryCode || "",
      star: +dataEdit?.star || 0,
      title: dataEdit?.title || "",
      priceNumber: dataEdit?.priceNumber || 0,
      areaNumber: dataEdit?.areaNumber || 0,
      // images: dataEdit?.images || "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      areaCode: dataEdit?.areaCode || "",
      description: isEdit ? JSON.parse(dataEdit?.description) : "",
      target: dataEdit?.target || "",
      province: dataEdit?.province || "",
    };
    return payload;
  });
  const { prices, areas, categories } = useSelector((state) => state.app);
  const [invalidFields, setInvalidFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState(() => {
    return isEdit ? JSON.parse(dataEdit?.images?.image) : [];
  });
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
    invalidFields.length > 0 && setInvalidFields([]);

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
    let invalids = validate(finalPayload, setInvalidFields);

    if (invalids === 0) {
      if (isEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imagesId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;
      }

      const res = isEdit
        ? await apiUpdatePost(finalPayload)
        : await apiCreatePost(finalPayload);
      if (res?.data.err === 0) {
        Swal.fire({
          title: "Thành công",
          text: isEdit ? "Cập nhật thành công" : "Đã thêm bài đăng mới",
          icon: "success",
        }).then(() => {
          isEdit && dispatch(resetPost());
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
          setImagesPreview([]);
          isEdit && setIsEdit(false);
        });
      } else {
        Swal.fire({
          title: "Oops",
          text: "Có lỗi gì ròi",
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="px-6 pb-20">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
      </h1>

      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
          />
          <OverView
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
          />
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
            text={isEdit ? "Lưu" : "Tạo mới"}
            bgColor="bg-green-600"
            textColor="text-white"
          />
        </div>
        <div className="w-1/3 flex-none pt-12">
          <Map address={payload?.address} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
