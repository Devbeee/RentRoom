import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { InputForm, Button } from "../../components";
import * as actions from "../../store/actions";
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
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
  const handleSubmit = async () => {
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    setInvalidFields([]);
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login);
    }
  };

  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            msg: "Bạn không được bỏ trống trường này",
          },
        ]);
        invalids++;
      }
    });
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                msg: "Mật khẩu phải có tối thiểu 6 ký tự",
              },
            ]);
            invalids++;
          }
          break;
        case "phone":
          const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
          if (!item[1].match(regexPhoneNumber)) {
            setInvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                msg: "Số điện thoại không hợp lệ",
              },
            ]);
            invalids++;
          }
          break;
        default:
          break;
      }
    });
    return invalids;
  };
  return (
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
  );
}

export default Login;
