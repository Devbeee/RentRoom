import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputReadOnly, InputFormV2, Button, Loading } from "../../components";
import anonAvatar from "../../assets/image/anon-avatar.png";
import { apiUpdateUser, apiUploadImages } from "../../services";
import validate from "../../utils/validateForm";
import Swal from "sweetalert2";
import { GetCurrentUser } from "../../store/actions";
const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    name: userData?.name || "",
    avatar: userData?.avatar || anonAvatar,
    fbUrl: userData?.fbUrl || "",
    zalo: userData?.zalo || "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    const ivalids = validate(payload, setInvalidFields);
    if (ivalids === 0) {
      const res = await apiUpdateUser(payload);
      if (res?.data.err === 0) {
        Swal.fire({
          title: "Thành công",
          text: "Cập nhật thành công",
          icon: "success",
        });
        dispatch(GetCurrentUser());
        navigate("/tao-moi-bai-dang");
      } else {
        Swal.fire({
          title: "Oops",
          text: "Cập nhật thất bại",
          icon: "success",
        });
      }
    }
  };
  const handleChangeAvatar = async (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    let formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);
    let response = await apiUploadImages(formData);
    if (response.status === 200) {
      setPayload((prev) => ({ ...prev, avatar: response.data?.secure_url }));
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center pb-6">
      <h1 className="w-full text-left text-3xl font-medium py-4 border-b border-gray-200">
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 py-6 flex flex-col gap-4">
        <InputReadOnly
          invalidFields={invalidFields}
          label={"Mã thành viên"}
          value={userData?.id || ""}
        />
        <InputReadOnly
          label={"Số điện thoại"}
          value={userData?.phone || ""}
          changer
          invalidFields={invalidFields}
        />
        <InputFormV2
          setValue={setPayload}
          label={"Tên hiển thị"}
          value={payload.name}
          name={"name"}
          invalidFields={invalidFields}
        />
        <InputFormV2
          setValue={setPayload}
          label={"Zalo"}
          value={payload.zalo}
          name={"zalo"}
          invalidFields={invalidFields}
        />
        <InputFormV2
          setValue={setPayload}
          label={"Facebook"}
          value={payload.fbUrl}
          name={"fbUrl"}
          invalidFields={invalidFields}
        />
        <div className="flex items-center gap-3">
          <label htmlFor="">Mật khẩu</label>
          <small className="text-blue-500 cursor-pointer">Đổi mật khẩu</small>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <label htmlFor="">Ảnh đại diện</label>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <img
                src={payload.avatar}
                alt=""
                className="w-20 h-20 rounded-full object-cover"
              />
              <input
                onChange={handleChangeAvatar}
                type="file"
                className="appearance-none my-4"
              />
            </div>
          )}
        </div>
        <Button
          text={"Cập nhật"}
          bgColor={"bg-blue-600"}
          textColor={"text-white"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditProfile;
