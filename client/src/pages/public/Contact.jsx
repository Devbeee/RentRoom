import React, { useState } from "react";
import Swal from "sweetalert2";
import { InputForm, Button } from "../../components";
import validate from "../../utils/validateForm";
const Contact = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });
  const handleSubmit = () => {
    setInvalidFields([]);
    let invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      Swal.fire({
        title: "Cảm ơn",
        text: "Phản hồi đã được ghi nhận",
        icon: "success",
      }).then(() => {
        setPayload({
          name: "",
          phone: "",
          content: "",
        });
      });
    }
  };
  return (
    <div className="w-full mb-6">
      <h1 className="text-2xl font-semibold my-2">Liên hệ với chúng tôi</h1>
      <div className="flex gap-6">
        <div className="flex-1 flex flex-col gap-4 rounded-3xl p-4 text-white bg-gradient-to-br from-blue-700 to-cyan-400">
          <h4 className="font-medium">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn PhongTro123.Com
          </span>
          <span>
            <strong>Điện thoại:</strong> 0917 686 101
          </span>
          <span>
            <strong>Email:</strong> cskh.phongtro123@gmail.com
          </span>
          <span>
            <strong>Zalo:</strong> 0917 686 101
          </span>
          <span>
            <strong>Viber:</strong> 0917 686 101
          </span>
          <span>
            <strong> Địa chỉ:</strong> Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue,
            Số 28 Mai Chí Thọ, Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ
            Chí Minh, Việt Nam.
          </span>
        </div>
        <div className="flex-1">
          <div className="bg-white w-[600px] mw-600 p-[30px] pb-[100px] rounded-3xl shadow-sm">
            <h4 className="font-semibold text-2xl mb-3">Liên hệ trực tuyến</h4>
            <div className="w-full flex flex-col gap-5">
              <InputForm
                label={"HỌ TÊN CỦA BẠN"}
                type={"text"}
                value={payload.name}
                name="name"
                setValue={setPayload}
                invalidFields={invalidFields}
              />
              <InputForm
                label={"SỐ ĐIỆN THOẠI"}
                type={"text"}
                value={payload.phone}
                name="phone"
                setValue={setPayload}
                invalidFields={invalidFields}
              />
              <InputForm
                label={"NỘi DUNG"}
                type={"text"}
                value={payload.password}
                name="content"
                setValue={setPayload}
                invalidFields={invalidFields}
              />
              <Button
                text={"Gửi liên hệ"}
                bgColor={"bg-secondary"}
                textColor={"text-white"}
                fullWidth
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
