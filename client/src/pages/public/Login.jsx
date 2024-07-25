import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputForm, Button } from "../../components";
import * as actions from "../../store/actions";
import Swal from "sweetalert2";
import validate from "../../utils/validateForm";
import { apiSendOTP } from "../../services";
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });
  useEffect(() => {
    const currentPathname = location.state?.flag ? "/register" : "/login";
    window.history.pushState({}, "", currentPathname);
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);
  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);
  useEffect(() => {
    msg &&
      Swal.fire({
        title: "Oops",
        text: msg,
        icon: "error",
      });
  }, [msg, update]);
  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    setInvalidFields([]);
    let invalids = validate(finalPayload, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(actions.register(payload));
        if (!msg) {
          apiSendOTP(payload);
          navigate("/xac-thuc-sdt", {
            state: { phoneNumber: payload?.phone },
          });
          Swal.fire({
            title: "Bạn đã đăng ký thành công",
            text: "Vui lòng cung cấp otp gửi qua sdt",
            icon: "success",
          });
        }
      } else {
        dispatch(actions.login(payload));
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-center mb-3">
      <div className="bg-white w-[600px] mw-600 p-[30px] pb-[100px] rounded-md shadow-sm mt-3">
        <h3 className="font-semibold text-2xl mb-3">
          {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
        </h3>
        <div className="w-full flex flex-col gap-5">
          {isRegister && (
            <InputForm
              label={"HỌ TÊN"}
              type={"text"}
              value={payload.name}
              name="name"
              setValue={setPayload}
              invalidFields={invalidFields}
            />
          )}
          <InputForm
            label={"SỐ ĐIỆN THOẠI"}
            type={"text"}
            value={payload.phone}
            name="phone"
            setValue={setPayload}
            invalidFields={invalidFields}
          />
          <InputForm
            label={"MẬT KHẨU"}
            type={"password"}
            value={payload.password}
            name="password"
            setValue={setPayload}
            invalidFields={invalidFields}
          />
          <Button
            text={isRegister ? "Đăng ký" : "Đăng nhập"}
            bgColor={"bg-secondary"}
            textColor={"text-white"}
            fullWidth
            onClick={handleSubmit}
          />
        </div>
        <div className="mt-7 flex items-center justify-between">
          {isRegister ? (
            <small>
              Bạn đã có tài khoản?
              <span
                className="text-blue-500 hover:underline cursor-pointer ml-1"
                onClick={() => {
                  setPayload({ phone: "", password: "", name: "" });
                  setInvalidFields([]);
                  setIsRegister(false);
                }}
              >
                Đăng nhập ngay
              </span>
            </small>
          ) : (
            <>
              <small className="text-[blue] hover:text-[red] cursor-pointer">
                Bạn quên mật khẩu
              </small>
              <small
                className="text-[blue] hover:text-[red] cursor-pointer"
                onClick={() => {
                  setPayload({ phone: "", password: "", name: "" });
                  setInvalidFields([]);
                  setIsRegister(true);
                }}
              >
                Tạo tài khoản mới
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
